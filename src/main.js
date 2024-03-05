import { createApp } from 'vue';
import App from './App.vue';
import router from './routes.js';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import store from './store/index'; 

const app = createApp(App);
app.use(router); 
app.use(store); 
app.mount('#app'); 
