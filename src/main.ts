import { createApp } from "vue";
import VueKonva from "vue-konva";

// @ts-expect-error
import App from "./App.vue";

import "./assets/main.css";

createApp(App).use(VueKonva).mount("#app");
