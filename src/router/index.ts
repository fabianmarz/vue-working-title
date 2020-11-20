import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
  NavigationGuardNext,
} from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

const Login = () => import('../views/Login.vue');
const Dashboard = () => import('../views/Dashboard.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/**
 * Redirect logged in users to the dashboard and avoid them from accessing
 * the login/register routes.
 *
 * Anonymous users are redirect to the login screen instead.
 */
router.beforeEach((
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
    const routeNames: Array<string> = ['login', 'register'];
    const routeName: string = String(to.name);
    if (user && routeNames.includes(routeName)) {
      next({
        name: 'dashboard',
      });
    }
    next();
  });
});

export default router;
