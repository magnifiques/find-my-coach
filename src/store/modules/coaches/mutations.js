export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  loadCoaches(state, payload) {
    state.coaches = payload;
  },
  setFetchTimeStamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
