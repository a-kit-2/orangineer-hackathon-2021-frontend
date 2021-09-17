<template>
  <v-container>
    <v-card>
      <v-card-title>
        コメント
      </v-card-title>
      <div v-for="comment in comments" :key="comment.id">
        <v-row class="mx-auto">
          <v-col cols="3">
            <v-avatar size="50">
              <img :src="comment.user_img" />
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <v-card class="">
              <v-card-text> {{ comment.content }} </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <v-row　class="mx-auto">
        <v-col cols="8">
          <v-form>
            <v-textarea v-model="content" rows="1"></v-textarea>
          </v-form>
        </v-col>
        <v-col cols="4">
          <v-btn
            @click="postComment"
            :disabled="content ? false : true"
            class="mt-3"
            color="primary"
          >
            投稿
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      content: ""
    };
  },
  mounted() {
    this.$store.dispatch("users/getUser");
    this.$store.dispatch("events/getComments", this.$route.params.id);
  },
  computed: {
    comments() {
      return this.$store.state.events.comments;
    },
    user() {
      return this.$store.state.users.user;
    }
  },
  methods: {
    resetContent() {
      this.content = "";
    },
    postComment() {
      axios
        .post(
          `http://localhost:3000/comments/create`,
          {
            comment: {
              user_id: 0,
              user_img: this.user.image_url,
              event_id: this.$route.params.id,
              content: this.content
            }
          },
          { withCredentials: true }
        )
        .then(response => {
          if (response.data.created_comment) {
            console.log("成功");
          } else {
            console.log("失敗");
          }
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          this.$store.dispatch("events/getComments", this.$route.params.id);
          this.resetContent();
        });
    }
  }
};
</script>
