<template>
  <v-footer app>
    <v-btn
      v-if="!$store.state.isEventDetails"
      to="/event-post"
      class="mx-auto"
      color="primary"
      fab
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-btn
      @click="interest()"
      v-if="$store.state.isEventDetails"
      large
      class="mx-auto"
      color="primary"
    >
      おもしろそう！
    </v-btn>
  </v-footer>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    interest() {
      axios
        .post(
          `http://localhost:3000/events/interest/${this.$route.params.id}`,
          {},
          { withCredentials: true }
        )
        .then(response => {
          if (response.data.create_joinning) {
            console.log("成功");
            location.reload();
          } else {
            console.log("失敗");
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
