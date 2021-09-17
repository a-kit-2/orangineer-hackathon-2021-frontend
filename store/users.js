export const state = () => ({
  user: {},
  join_users: {}
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setJoinUser(state, users) {
    state.join_users = users;
  }
};

import axios from "axios";
export const actions = {
  getUser({ commit }) {
    axios
      .get(`http://localhost:3000/users/signedin`, { withCredentials: true })
      .then(response => {
        commit("setUser", response.data.user);
      })
      .catch(e => {
        console.log(e);
      });
  },
  getUserDetails({ commit }, id) {
    axios
      .get(`http://localhost:3000/users/show/${id}`, { withCredentials: true })
      .then(response => {
        commit("setUser", response.data.user);
      })
      .catch(e => {
        console.log(e);
      });
  },
  getJoinUsers({ commit }, id) {
    axios
      .get(`http://localhost:3000/users/like/${id}`, { withCredentials: true })
      .then(response => {
        commit("setJoinUser", response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
