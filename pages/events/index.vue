<template>
  <v-row>
    <v-col>
      <Event :event="event" v-for="event in events" :key="event.id" />
    </v-col>
  </v-row>
</template>

<script>
import Event from "~/components/Event.vue";

export default {
  components: {
    Event
  },
  mounted() {
    this.$store.dispatch("events/getEvents");
    this.$store.dispatch("users/getUser");
    this.$store.commit("isEventDetailsFalse");
  },
  data() {
    return {};
  },
  computed: {
    events() {
      return this.$store.state.events.list;
    }
  },
  methods: {}
};
</script>
