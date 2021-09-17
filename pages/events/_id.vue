<template>
  <v-row>
    <v-col>
      <v-card elevation="2" outlined shaped>
        <v-row>
          <v-col cols="2">
            <v-avatar size="56">
              <img :src="event.user_img" />
            </v-avatar>
          </v-col>
          <v-col cols="10">
            <v-card-title class="pb-0">{{ event.title }}</v-card-title>
            <v-card-text class="pb-0">{{ date }}</v-card-text>
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
          <h2 class="mb-2">内容</h2>
          <p>{{ event.content }}</p>
          <h2 class="mb-2">ごほうび</h2>
          <v-row class="mb-2">
            <v-col cols="3">
              <v-avatar size="50">
                <img :src="event.user_img" />
              </v-avatar>
            </v-col>
            <v-col cols="9">
              <v-card class="">
                <v-card-text> {{ event.reward }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <h2 class="mb-2">開催場所URL</h2>
          <a :href="event.map_url" target="_blank">{{ event.map_url }}</a>
        </v-card-text>
        <Comment class="my-2" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Comment from "../../components/Comment.vue";
export default {
  components: {
    Comment
  },
  mounted() {
    this.$store.dispatch("events/getEvent", this.$route.params.id);
    this.$store.commit("isEventDetailsTrue");
  },
  data() {
    return {};
  },
  computed: {
    event() {
      return this.$store.state.events.event;
    },
    date() {
      if (typeof this.event.created_at == "string") {
        return (
          this.event.created_at.substr(0, 4) +
          "/" +
          this.event.created_at.substr(5, 2) +
          "/" +
          this.event.created_at.substr(8, 2)
        );
      }
    }
  },
  methods: {}
};
</script>
