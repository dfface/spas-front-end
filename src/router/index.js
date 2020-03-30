import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// 添加全局导航守卫

router.beforeEach(function(to, from, next){
  if(to.matched.some(record => record.meta.notRequireAuth)){
    next();
  } else {
    if(!localStorage.getItem("isLogged")){
      next('/login');
    } else {
      next();
    }
  }
});

export default router
