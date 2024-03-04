import { createRouter, createWebHistory } from 'vue-router' 
import LoginPage from './components/LoginPage.vue' 
import RegisterPage from './components/RegisterPage.vue'
import DashboardPage from './components/DashboardPage.vue';
import TaggingPage from './components/TaggingPage.vue';
import ReportsPage from './components/ReportsPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/signup', component: RegisterPage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/tagging', component: TaggingPage },
  { path: '/reports', component: ReportsPage }

]

const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router 
