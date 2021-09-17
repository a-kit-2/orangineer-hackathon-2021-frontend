<template>
  <v-row>
    <v-col>
      <v-card @click="eventDetails()" elevation="2" outlined shaped>
        <v-row>
          <v-col cols="2">
            <v-avatar size="56" @click.stop="userPage()">
              <img :src="event.user_img" />
            </v-avatar>
          </v-col>
          <v-col cols="10">
            <v-card-title>{{ event.title }}</v-card-title>
          </v-col>
        </v-row>
        <v-avatar
          v-for="user in event.images"
          :key="user.id"
          size="40"
          class="ma-1"
        >
          <img :src="user.image_url" />
        </v-avatar>
        <v-card-text>
          {{ event.content }}
          <br />
          {{ event.created_at.substr(0, 4) }}/{{
            event.created_at.substr(5, 2)
          }}/{{ event.created_at.substr(8, 2) }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["event"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    eventDetails() {
      this.$router.push(`/events/${this.event.id}`);
    },
    userPage() {
      this.$router.push(`/user/${this.event.user_id}`);
    }
  }
};
</script>
