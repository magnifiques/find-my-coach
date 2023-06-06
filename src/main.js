import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseLoader from "./components/ui/BaseLoader.vue";

const app = createApp(App);

const BaseModal = defineAsyncComponent(() =>
  import("./components/ui/BaseModal.vue")
);

app.use(router);
app.use(store);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-badge", BaseBadge);
app.component("base-loader", BaseLoader);
app.component("base-modal", BaseModal);

app.mount("#app");
