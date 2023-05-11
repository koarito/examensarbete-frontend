<template>
  <v-form @submit.stop.prevent="handleSubmit">
    <div class="padding">
      <v-sheet elevation="10" rounded class="wi">
        <v-container
          class="d-flex wi justify-space-between flex-column align-center"
        >
          <v-row>
            <v-col>
              <div class="text-h3 text-center">Edit Review</div>
            </v-col>
          </v-row>
          <v-row class="w-50">
            <v-col>
              <v-text-field
                type="text"
                color="primary"
                label="Jira id"
                v-model="values.jiraId"
              />
            </v-col>
          </v-row>

          <v-row class="w-50">
            <v-col>
              <v-text-field
                type="text"
                color="primary"
                label="Git link"
                v-model="values.gitLink"
              />
            </v-col>
          </v-row>
          <v-row class="w-50">
            <v-col>
              <v-text-field
                type="text"
                color="primary"
                label="Git branch"
                v-model="values.branch"
              />
            </v-col>
          </v-row>
          <v-row class="w-25">
            <v-col>
              <v-select
                label="Team"
                :items="teamNames"
                v-model="selectedTeam"
              />
            </v-col>
          </v-row>
          <v-row class="w-100">
            <v-col align-self="end">
              <div class="text-h6 text-center">Assigned Devs</div>
              <v-list bg-color="primary">
                <v-list-item
                  v-for="dev in assignedDevs"
                  :key="dev.id"
                  :border="true"
                  :title="dev.firstName + ' ' + dev.lastName"
                  append-icon="mdi-minus-circle"
                  prepend-icon="mdi-account"
                  @click="handleDev(false, dev.id)"
                />
              </v-list>
            </v-col>
            <v-spacer />
            <v-col>
              <div class="text-h6 text-center">Non Assigned Devs</div>
              <v-list bg-color="primary">
                <v-list-item
                  v-for="dev in nonAssignedDevs"
                  :key="dev.id"
                  :border="true"
                  :title="dev.firstName + ' ' + dev.lastName"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-account"
                  @click="handleDev(true, dev.id)"
                />
              </v-list>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="secondary" type="submit">Edit Review</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </div>
  </v-form>
</template>
<script>
import { reactive, ref, onMounted, computed } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/Auth";
import { useRoute } from "vue-router";
export default {
  setup() {
    const values = reactive({
      jiraId: "",
      gitLink: "",
      branch: "",
      reviewersIds: [],
    });
    const teams = ref([]);
    const selectedTeam = ref("");

    const assignedDevs = computed(() => {
      const tempTeam = teams.value.find(
        (team) => team.name === selectedTeam.value
      );
      return tempTeam
        ? tempTeam.developers.filter((developer) =>
            values.reviewersIds.includes(developer.id)
          )
        : [];
    });

    const nonAssignedDevs = computed(() => {
      const tempTeam = teams.value.find(
        (team) => team.name === selectedTeam.value
      );
      return tempTeam
        ? tempTeam.developers.filter(
            (developer) => !values.reviewersIds.includes(developer.id)
          )
        : [];
    });

    const teamNames = computed(() => {
      const temp = [];
      teams.value.forEach((team) => {
        temp.push(team.name);
      });
      return temp;
    });

    function handleDev(addDev, devId) {
      if (addDev) values.reviewersIds.push(devId);
      else {
        values.reviewersIds.splice(values.reviewersIds.indexOf(devId), 1);
      }
    }
    async function loadReview() {
      await axios
        .get(
          `http://localhost:8080/review/get/review/${
            useRoute().params.reviewId
          }`,
          {
            headers: { Authorization: "Bearer " + useAuthStore().getToken },
          }
        )
        .then((response) => {
          response.data.reviewers.forEach((reviewer) =>
            values.reviewersIds.push(reviewer.id)
          );
          values.jiraId = response.data.jiraId;
          values.gitLink = response.data.gitLink;
          values.branch = response.data.branch;
        })
        .catch((error) => {
          if (error.response) {
            console.log("Data :", error.response.data);
            console.log("Status :" + error.response.status);
            if (error.response.status == 500) {
              useAuthStore().logout();
            }
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    }
    async function loadTeams() {
      await axios
        .get("http://localhost:8080/user/teams", {
          headers: { Authorization: "Bearer " + useAuthStore().getToken },
        })
        .then((response) => {
          teams.value = response.data;
          selectedTeam.value = teams.value[0].name;
        })
        .catch((error) => {
          if (error.response) {
            console.log("Data :", error.response.data);
            console.log("Status :" + error.response.status);
            if (error.response.status == 500) {
              useAuthStore().logout();
            }
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    }
    onMounted(() => {
      loadTeams();
      loadReview();
    });

    return {
      handleDev,
      values,
      teams,
      selectedTeam,
      assignedDevs,
      nonAssignedDevs,
      teamNames,
    };
  },
};
</script>
<style>
.padding {
  padding-top: 10rem;
}
.wi {
  width: 90%;
  margin: auto;
}
</style>
