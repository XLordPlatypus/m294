import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from "../vuetify.ts";
import router from "./router.ts";

const app: App = createApp(App);
app.use(router)
app.use(vuetify)
app.mount('#app')
