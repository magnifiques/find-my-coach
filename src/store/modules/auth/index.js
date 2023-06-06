import authActions from "./actions";
import authGetters from "./getters";
import authMutations from "./mutations";

export default {
  state() {
    return {
      userId: null,
      token: null,
      loggedOut: false,
    };
  },
  actions: authActions,
  mutations: authMutations,
  getters: authGetters,
};
