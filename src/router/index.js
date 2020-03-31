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
    path: '/case/new',
    name: 'CaseNew',
    component: () => import('../components/case/New')
  },
  {
    path: '/case/detail/:caseId',
    name: 'CaseDetail',
    props: true,
    component: () => import('../components/case/Detail')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// 添加全局导航守卫
router.beforeEach(async function(to, from, next){
  // 解决登录后刷新后自动跳转到 login 的 bug: 曲线救国，使用非 httpOnly 的 cookie（只是表征一下登录状态）
  // 可以测试刷新时的值，绝对是 false
  console.log("router-isLoggedVuex: " + store.state.isLogged);
  if(to.matched.some(record => record.meta.notRequireAuth)){
    next();
  }
  // 路由必须用 cookie 判断，因为一旦你刷新页面 vuex 来不及就一个 false，每次刷新都是 false
  else if(!isLoggedCookie()) {
    // DEBUG：登录到期/服务端下线，而 vuex 值不变
    store.commit('changeIsLogged',false);
    next('/login');
  }
  else {
    next();
  }
});

export default router
