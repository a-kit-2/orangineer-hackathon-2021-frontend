export const state = () => ({
  list: [],
  event: {},
  comments: []
});

export const mutations = {
  setEvents(state, events) {
    state.list = events;
  },
  setEvent(state, event) {
    state.event = event;
  },
  setComments(state, comments) {
    state.comments = comments;
  }
};

import axios from "axios";
export const actions = {
  getEvents({ commit }) {
    axios
      .get(`http://localhost:3000/events/index`, {}, { withCredentials: true })
      .then(response => {
        commit("setEvents", response.data.events);
      })
      .catch(e => {
        console.log(e);
      });
  },
  getEvent({ commit }, id) {
    axios
      .get(
        `http://localhost:3000/events/show/${id}`,
        {},
        { withCredentials: true }
      )
      .then(response => {
        commit("setEvent", response.data.event);
      })
      .catch(e => {
        console.log(e);
      });
  },
  getComments({ commit }, event_id) {
    axios
      .get(
        `http://localhost:3000/comments/show/${event_id}`,
        { withCredentials: true }
      )
      .then(response => {
        commit("setComments", response.data.comments);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
