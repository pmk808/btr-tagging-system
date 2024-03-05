import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import LoadingComponent from './components/dashboardcomp/LoadingComponent.vue';
import DashboardPage from './components/DashboardPage.vue';
import TaggingPage from './components/TaggingPage.vue';
import ReportsPage from './components/ReportsPage.vue';
import { supabase } from './supabaseconfig.js';

const routes = [
  { path: '/', component: LoginPage, meta: { requiresAuth: false } },
  { path: '/signup', component: RegisterPage, meta: { requiresAuth: false } },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } }, // Add meta field to indicate authentication is required
  { path: '/tagging', component: TaggingPage, meta: { requiresAuth: true } }, // Add meta field to indicate authentication is required
  { path: '/reports', component: ReportsPage, meta: { requiresAuth: true } }, // Add meta field to indicate authentication is required
  { path: '/loading', component: LoadingComponent } // Add loading route

]

const router = createRouter({
  history: createWebHistory(),
  routes
});

async function getUser(to, from, next) {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    // Handle session error
    console.error('Session error:', error);
    next('/'); // Redirect to the login page on session errors
  } else if (!data.session) {
    next('/'); // Redirect to the login page if no session
  } else {
    next(); // Proceed to the requested route if authenticated
  }
}


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    getUser(to, from, next);
  } else {
    next();
  }
});

export default router 
