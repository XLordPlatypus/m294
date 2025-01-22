import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from "../vuetify.ts";
import router from "./router.ts";

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
