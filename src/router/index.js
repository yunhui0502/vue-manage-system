import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from '../views/404/index.vue'
import Home from '../views/Home/Home.vue'
import Loogin from '../views/loogin/loogin.vue'
import Code from '../views/loogin/code.vue'
import Orderform from '../views/orderform'
import Commodity from '../views/commodity'
import Product from '../views/commodity/product.vue'
import Detail from '../views/commodity/detail.vue'
import Statistics from '../views/statistics'
import Category from '../views/category'
import Coupon from '../views/coupon'
import User from '../views/user'
import Set from '../views/set'
import Header from '../views/header'
import Mingx from '../views/property/mingx.vue'
import Tixian from '../views/property/tixian.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/loogin',
    name: 'loogin',
    component: Loogin
  },
  {
    path: '/code',
    name: 'code',
    component: Code
  },
  {
    path: '/',
    component: Home,
    children: [
      { path: '/orderform', name: 'orderform', component: Orderform },
      { path: '/commodity', name: 'commodity', component: Commodity },
      { path: '/statistics', name: 'statistics', component: Statistics },
      { path: '/category', name: 'category', component: Category },
      { path: '/coupon', name: 'coupon', component: Coupon },
      { path: '/user', name: 'user', component: User },
      { path: '/set', name: 'set', component: Set },
      { path: '/mingx', name: 'mingx', component: Mingx },
      { path: '/tixian', name: 'tixian', component: Tixian },
      { path: '/', name: 'header', component: Header },
      { path: '/detail', name: 'detail', component: Detail },
      { path: '/product', name: 'product', component: Product }
    ]
  },
  { path: '*', name: '404', component: NotFound }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
