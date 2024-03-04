import { createApp } from 'vue';
import App from './App.vue';
import router from './routes.js';
import '@fortawesome/fontawesome-free/js/all.js';
import '@fortawesome/vue-fontawesome';

const app = createApp(App);
app.use(router); 
app.mount('#app'); 
