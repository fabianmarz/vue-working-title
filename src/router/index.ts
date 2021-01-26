import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

import { firebaseApp } from '@/models/user/auth';
import userLogin from '@/models/user/login';

const Login = () => import('../views/Login.vue');
const Dashboard = () => import('../views/Dashboard.vue');
const SingleListItemDetails = () => import('../views/SingleList/SingleListItemDetails.vue');

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
  {
    path: '/logout',
    name: 'logout',
    redirect: () => {
      userLogin().logout();
      return '/';
    },
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  // Item routes
  {
    path: '/list/:listId/item/:itemId/details',
    name: 'SingleListItemDetails',
    component: SingleListItemDetails,
    props: true,
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
router.beforeEach((to, from, next) => {
  firebaseApp.auth().onAuthStateChanged((user) => {
    const routeNames = [
      'login',
      'register',
    ];
    const routeName = String(to.name);
    if (user && routeNames.includes(routeName)) {
      console.log(routeName);
      return next({ name: 'dashboard' });
    }
    return next();
  });
});

export default router;
