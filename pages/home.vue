<template>
  <v-row>
    <v-col>
      お待ちください、、、
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    axios
      .post(
        `http://localhost:3000/users/signin`,
        {
          user: {
            name: this.$auth.$state.user.name,
            email: this.$auth.$state.user.email,
            content: "",
            image_url: this.$auth.$state.user.picture,
            sub: this.$auth.$state.user.sub
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.signed_in) {
          this.$router.push("/");
        } else {
          this.$touter.push("/");
        }
      })
      .catch(e => {
        console.log(e);
      });
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
