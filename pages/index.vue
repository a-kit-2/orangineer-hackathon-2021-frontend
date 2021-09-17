<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6"> </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    if (this.$auth.$state.loggedIn == false) {
      this.$auth.loginWith("auth0");
    } else {
      this.$store.dispatch("users/getUser");
      this.$router.push("/events");
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
