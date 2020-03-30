import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {isLoggedCookie} from '../common/utils'
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login'),
    meta: { notRequireAuth: true }
  },
  {
    path: '/case/add',
    name: 'CaseAdd',
    component: () => import('../components/case/New')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// 添加全局导航守卫
router.beforeEach(async function(to, from, next){
  // 解决登录后刷新后自动跳转到 login 的 bug: 曲线救国，使用非 httpOnly 的 cookie（只是表征一下登录状态）
  console.log("router-isLoggedVuex: " + store.state.isLogged);
  if(to.matched.some(record => record.meta.notRequireAuth)){
    next();
  }
  else if(!isLoggedCookie()) {
    next('/login');
  }
  else {
    next();
  }
});

export default router
