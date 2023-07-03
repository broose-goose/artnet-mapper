import { createApp } from 'vue'
import vuetify from './plugins/vuetify';
import './style.css'
import { createPinia } from "pinia";
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(vuetify);

app.mount('#app');
