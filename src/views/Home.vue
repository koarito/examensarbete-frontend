<template lang="">
  <div>
    <h1>Homepage</h1>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/Auth";
export default {
  setup() {
    const token = useAuthStore().getToken;
    return { useAuthStore, token };
  },
};
</script>
<style lang=""></style>
