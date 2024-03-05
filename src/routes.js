import { createRouter, createWebHistory } from 'vue-router' 
import LoginPage from './components/LoginPage.vue' 
import RegisterPage from './components/RegisterPage.vue'
import LoadingComponent from './components/dashboardcomp/LoadingComponent.vue';
import DashboardPage from './components/DashboardPage.vue';
import TaggingPage from './components/TaggingPage.vue';
import ReportsPage from './components/ReportsPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/signup', component: RegisterPage },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } }, // Add meta field to indicate authentication is required
  { path: '/tagging', component: TaggingPage, meta: { requiresAuth: true } }, // Add meta field to indicate authentication is required
  { path: '/reports', component: ReportsPage, meta: { requiresAuth: true } }, // Add meta field to indicate authentication is required
  { path: '/loading', component: LoadingComponent } // Add loading route

]

const router = createRouter({
  history: createWebHistory(), 
  routes
})
export default router 
