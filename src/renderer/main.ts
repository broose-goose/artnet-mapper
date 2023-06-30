import { createApp } from 'vue'
import { createPinia } from "pinia";
import vuetify from './plugins/vuetify';
import App from './App.vue'


const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(vuetify);

app.mount('#app');
