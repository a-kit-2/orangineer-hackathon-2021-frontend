<template>
  <v-form>
    <v-container>
      <v-row>
        <v-text-field
          label="イベント名"
          placeholder="〇〇のお手伝い募集！！"
          filled
          v-model="title"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-textarea
          v-model="content"
          filled
          name="input-7-4"
          label="イベント内容"
        ></v-textarea>
      </v-row>
      <v-row>
        <v-text-field
          v-model="reward"
          label="報酬"
          placeholder="お米"
          filled
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="map_url"
          label="開催場所URL"
          placeholder=""
          filled
        ></v-text-field>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-btn href="https://www.google.co.jp/maps" target="_blank"
            >Google Mapへ</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn @click="eventPost()">イベント投稿</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  mounted() {
    this.$store.commit("isEventDetailsFalse");
  },
  data() {
    return {
      title: "",
      content: "",
      reward: "",
      map_url: ""
    };
  },
  // ${process.env.API_URL}
  methods: {
    async eventPost() {
      await axios
        .post(
          `http://localhost:3000/events/create`,
          {
            event: {
              user_id: 0,
              title: this.title,
              map_url: this.map_url,
              reward: this.reward,
              content: this.content,
              isDeleted: false
            }
          },
          { withCredentials: true }
        )
        .then(response => {
          if (response.data.event_created) {
            console.log("成功");
            this.$router.push("/events");
          } else {
            console.log("失敗");
            this.$router.push("/events");
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  computed: {}
};
</script>
