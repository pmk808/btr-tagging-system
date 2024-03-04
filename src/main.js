import { createApp } from 'vue';
import App from './App.vue';
import router from './routes.js';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);
app.use(router); 
app.use(store); 
app.mount('#app'); 
