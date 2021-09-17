<template>
  <v-card elevation="2" outlined shaped>
    <v-row class="mx-auto my-2">
      <v-avatar size="100" class="mx-auto">
        <img :src="user.image_url" />
      </v-avatar>
    </v-row>
    <v-row class="mx-auto mb-2">
      <v-avatar
        v-for="user in join_users.like_users"
        :key="user.id"
        size="40"
        class="ma-1"
      >
        <img :src="user.image_url" />
      </v-avatar>
      <v-avatar
        v-for="user in join_users.liked_users"
        :key="user.id"
        size="40"
        class="ma-1"
      >
        <img :src="user.image_url" />
      </v-avatar>
    </v-row>
    <h2 class="text-center">{{ user.name }}</h2>
    <p class="text-center">{{ user.email }}</p>
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="ma-1">
          <v-card-title>
            自己紹介
          </v-card-title>
          <v-card-text>{{ user.content }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="user.id == userId"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left> mdi-pencil </v-icon>
            自己紹介更新
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">ユーザー情報</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    label="自己紹介*"
                    persistent-hint
                    required
                    v-model="content"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>* いつでも変更可能です。</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              閉じる
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveSettings">
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-btn @click="logout()" class="mx-auto my-5">
        ログアウト
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.$store.dispatch("users/getJoinUsers", this.$route.params.id);
    this.$store.dispatch("users/getUserDetails", this.$route.params.id);
    if (this.$auth.$state.loggedIn) {
      this.userImg = this.$auth.$state.user.picture;
    }
    this.$store.commit("isEventDetailsFalse");
  },
  data() {
    return {
      userImg: "~/assets/img/user.png",
      dialog: false,
      content: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.users.user;
    },
    join_users() {
      return this.$store.state.users.join_users;
    },
    userId() {
      return this.$route.params.id;
    }
  },
  methods: {
    // logout: function() {
    //   this.$auth.logout();
    //   // window.location.href = "/";
    // }
    async logout() {
      await this.$auth.logout();
      window.location.href =
        "https://orangineer-2021.jp.auth0.com/v2/logout?returnTo=http://localhost:8000&client_id=CvDx5UHlPI8AIa3k19Z5f2XVYPOrvUfW";
      await axios.post(`http://localhost:3000/users/signout`, {
        withCredentials: true
      });
    },
    async saveSettings() {
      await axios
        .patch(
          "http://localhost:3000/users/saveSettings",
          {
            user: {
              content: this.content
            }
          },
          { withCredentials: true }
        )
        .then(response => {
          if (response.data.content_updated) {
            console.log("ユーザー情報アップデート完了");
            this.$store.dispatch("users/getUser");
            this.dialog = false;
          } else {
            console.log("ユーザー情報アップデート失敗");
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
