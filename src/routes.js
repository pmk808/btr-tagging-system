import { createRouter, createWebHistory } from 'vue-router' 
import LoginPage from './components/LoginPage.vue' 
import RegisterPage from './components/RegisterPage.vue'
import DashboardPage from './components/DashboardPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/signup', component: RegisterPage },
  { path: '/dashboard', component: DashboardPage },
]

const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router 
