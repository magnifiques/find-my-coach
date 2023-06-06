export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  loggedOut(state) {
    return state.loggedOut;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
};
