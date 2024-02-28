import { createRouter, createWebHistory } from 'vue-router' 
import LoginPage from './components/LoginPage.vue' 
import RegisterPage from './components/RegisterPage.vue'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/signup', component: RegisterPage },
]

const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router 
