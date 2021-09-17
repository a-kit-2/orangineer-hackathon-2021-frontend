<template>
  <v-app-bar fixed app>
    <v-btn to="/events" class="mr-5" fab small>
      <v-icon>
        mdi-format-list-bulleted-square
      </v-icon>
    </v-btn>
    <v-toolbar-title>会津若松 永和 イベント</v-toolbar-title>
    <v-spacer />
    <v-avatar v-if="this.$auth.$state" @click="userDetails()" size="40">
      <img :src="userImg" />
    </v-avatar>
  </v-app-bar>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {};
  },
  computed: {
    userImg() {
      if (this.$auth.$state.loggedIn) {
        return this.$auth.$state.user.picture;
      }
    }
  },
  methods: {
    userDetails() {
      this.$router.push(`/user/${this.$store.state.users.user.id}`);
    }
  }
};
</script>
