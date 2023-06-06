import { createStore } from "vuex";
import coachesModule from "./modules/coaches";
import requestsModule from "./modules/requests";
import authModule from "./modules/auth";

export default createStore({
  modules: {
    coach: coachesModule,
    request: requestsModule,
    auth: authModule,
  },
});
