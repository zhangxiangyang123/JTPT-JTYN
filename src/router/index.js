import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    redirect: '/display',
    hidden: true
  },

  {
    path: '/systems',
    component: () => import('@/views/system-switch/index'),
    hidden: true
  },
  {
    path: '/display',
    component: () => import('@/views/data-display/index'),
    hidden: true
  },
  {
    path: '/test',
    component: () => import('@/views/test/index'),
    hidden: true
  },
  {
    path: '/odAnalysis',
    component: () => import('@/views/odAnalysis/index'),
    hidden: true
  },
  {
    path: '/odAnalysis/event',
    component: () => import('@/views/odAnalysis/event'),
    hidden: true
  }
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
