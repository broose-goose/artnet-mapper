import { createApp } from 'vue'
import './style.css'
import vuetify from './plugins/vuetify';
import { createPinia } from "pinia";
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(vuetify);

app.mount('#app');
