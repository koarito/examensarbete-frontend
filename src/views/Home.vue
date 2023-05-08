<template lang="">
  <div class="d-flex justify-center align-center padding flex-column">
    <v-sheet elevation="10" color="#fab9cc" rounded class="wi">
      <div class="d-flex align-center w-100">
        <div class="w-50 pt-10">
          <div class="text-h4 text-center">Assigned Reviews</div>
          <v-table theme="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Author</th>
                <th>Jira</th>
                <th>Merge Request</th>
                <th>Git branch</th>
                <th>Grade Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="review in assignedReviews.value" :key="review.id">
                <td>{{ review.status }}</td>
                <td>
                  {{ review.author.firstName + " " + review.author.lastName }}
                </td>
                <td>{{ review.jiraId }}</td>
                <td>{{ review.gitLink }}</td>
                <td>{{ review.branch }}</td>
                <td><v-btn color="primary">chikoni</v-btn></td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <v-divider
          :thickness="3"
          class="border-opacity-50"
          color="primary"
          vertical
        ></v-divider>

        <div class="w-50">
          <div class="text-h4 text-center pt-10">Own Reviews</div>
          <v-table theme="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Jira</th>
                <th>Merge Request</th>
                <th>Git branch</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="review in ownReviews.value" :key="review.id">
                <td>{{ review.status }}</td>
                <td>{{ review.jiraId }}</td>
                <td>{{ review.gitLink }}</td>
                <td>{{ review.branch }}</td>
                <td><v-btn color="primary">Edit</v-btn></td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
      <div class="d-flex justify-center py-10">
        <v-btn to="/create/review" color="pink-darken-1">Create Review</v-btn>
      </div>
    </v-sheet>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/Auth";
import axios from "axios";
import { reactive, onMounted } from "vue";
export default {
  setup() {
    const assignedReviews = reactive([]);
    const ownReviews = reactive([]);

    async function loadReviews() {
      await axios
        .get("http://localhost:8080/review/get/assigned/reviews", {
          headers: {
            Authorization: "Bearer " + useAuthStore().getToken,
          },
        })
        .then((response) => {
          assignedReviews.value = response.data;
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

      await axios
        .get("http://localhost:8080/review/get/reviews", {
          headers: {
            Authorization: "Bearer " + useAuthStore().getToken,
          },
        })
        .then((response) => {
          ownReviews.value = response.data;
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
      loadReviews();
    });

    return { useAuthStore, assignedReviews, ownReviews };
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
