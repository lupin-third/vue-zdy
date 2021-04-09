import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import test from '../views/test'
import UltraMain from '../views/UltraMain'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blogs',
    name: 'Blogs',
    // 懒加载
    component: () => import('../views/Blogs.vue')
  },
  {
    path: '/ultra/main',
    name: 'UltraMain',
    meta:{
      requireAuth: true
    },
    component: UltraMain
  },
  {
    path: '/blog/add', // 注意放在 path: '/blog/:blogId'之前
    name: 'BlogAdd',
    meta: {
      requireAuth: true//此属性表示登录后才能访问的受限资源
    },
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  },
  {
    path: '/test',
    name: 'test',
    component: test
  }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
