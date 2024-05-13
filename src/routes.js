import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import LoadingComponent from './components/dashboardcomp/LoadingComponent.vue';
import DashboardPage from './components/DashboardPage.vue';
import TaggingPage from './components/TaggingPage.vue';
import TaggingForm from './components/TaggingForm.vue';
import ReportsPage from './components/ReportsPage.vue';
import AllowUsers from './components/AllowUsers.vue'; // Import the AllowUsers component
import DDSFiles from './components/DDSFiles.vue'; // Import the DDSFiles component
import DDSTaggingform from './components/DDSTaggingform.vue';
import DDSTaggingpage from './components/DDSTaggingpage.vue';

const routes = [
  { path: '/', component: LoginPage, meta: { requiresAuth: false } }, // Allow access to the login page by default
  { path: '/signup', component: RegisterPage, meta: { requiresAuth: false } }, // Allow access to the signup page by default
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } }, // Protect dashboard route
  { path: '/tagging', component: TaggingPage, meta: { requiresAuth: true } }, // Protect tagging route
  { path: '/reports', component: ReportsPage, meta: { requiresAuth: true } }, // Protect reports route
  { path: '/loading', component: LoadingComponent }, // Add loading route
  { path: '/taggingForm', component: TaggingForm, meta: { requiresAuth: true } },
  { path: '/ddstaggingform', component: DDSTaggingform, meta: { requiresAuth: true } },
  { path: '/ddstaggingpage', component: DDSTaggingpage, meta: { requiresAuth: true } },
  { path: '/allow-users', component: AllowUsers, meta: { requiresAuth: true } }, // Add AllowUsers route
  { path: '/provincial', component: DDSFiles, meta: { requiresAuth: true } }, // Add provincial route
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('sb-yszwlktldjrohxuneyop-auth-token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !token) {
    // If route requires authentication and there's no token, redirect to login
    next('/');
  } else if (!requiresAuth && token) {
    // If route doesn't require authentication and there's a token, redirect to dashboard
    next('/dashboard');
  } else {
    // Otherwise, proceed with the navigation
    next();
  }
});

export default router;
