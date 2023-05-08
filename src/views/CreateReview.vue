<template>
  <div class="wi padding">
    <v-sheet elevation="10" rounded class="wi">
      <div class="text-h3 text-center">Create Review</div>
      <v-form>
        <div class="d-flex flex-column w-100">
          <div class="w-50 mx-auto">
            <v-text-field
              type="text"
              color="primary"
              label="Jira id"
              v-model="values.jiraId"
            />
          </div>
          <div class="w-50 mx-auto">
            <v-text-field
              type="text"
              color="primary"
              label="Git link"
              v-model="values.gitLink"
            />
          </div>
          <div class="w-50 mx-auto">
            <v-text-field
              type="text"
              color="primary"
              label="Git branch"
              v-model="values.branch"
            />
          </div>
          <div class="w-25 mx-auto">
            <v-select label="Team" :items="teamNames" v-model="selectedTeam" />
          </div>
          <div class="d-flex flex-self-start w-25">
            <div class="text-h6 text-center">Assigned Devs</div>
            <v-input
              append-icon="mdi-close"
              v-for="dev in assignedDevs"
              :key="dev.id"
            ></v-input>
          </div>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/Auth";
import { computed } from "vue";

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
    async function loadTeams() {
      await axios
        .get("http://localhost:8080/user/teams", {
          headers: { Authorization: "Bearer " + useAuthStore().getToken },
        })
        .then((response) => {
          teams.value = response.data;
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
    });

    return { values, teamNames, selectedTeam, assignedDevs, nonAssignedDevs };
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
