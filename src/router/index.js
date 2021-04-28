import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import test from '../views/test'
import UltraMain from '../views/UltraMain'
import meme from "../views/documentation/meme";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Login' }
  },
    //网站登录页
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
    //网站测试页0
  {
    path: '/blogs',
    name: 'Blogs',
    // 懒加载
    component: () => import('../views/Blogs.vue')
  },
    //网站主页
  {
    path: '/ultra/main',
    name: 'UltraMain',
    meta:{
      requireAuth: true
    },
    component: UltraMain
  },
    //网站测试页1
  {
    path: '/blog/add', // 注意放在 path: '/blog/:blogId'之前
    name: 'BlogAdd',
    meta: {
      requireAuth: true//此属性表示登录后才能访问的受限资源
    },
    component: BlogEdit
  },
    //网站测试页2
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
    //网站测试页3
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  },
    //网站测试页4
  {
    path: '/test',
    name: 'test',
    component: test
  },
    //奥特名梗页
  {
    path:'/ultra/meme',
    name: 'meme',
    meta: {
      requireAuth: true
    },
    component: meme
  }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
