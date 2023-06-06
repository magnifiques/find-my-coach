export default {
  registerRequest(state, payload) {
    state.requests.push(payload);
    console.log(state.requests);
  },
  getRequests(state, payload) {
    state.requests = payload;
  },
};
