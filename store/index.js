export const state = () => ({
  isEventDetails: false
});

export const mutations = {
  isEventDetailsTrue(state) {
    state.isEventDetails = true;
  },
  isEventDetailsFalse(state) {
    state.isEventDetails = false;
  }
};
