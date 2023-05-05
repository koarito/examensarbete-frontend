import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export function registerPlugins(app) {
  loadFonts();
  const pinia = createPinia().use(piniaPluginPersistedstate);
  app.use(vuetify).use(router).use(pinia);
}
