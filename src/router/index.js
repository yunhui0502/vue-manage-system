import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home/Home.vue'
import Loogin from '../views/loogin/loogin.vue'
import Code from '../views/loogin/code.vue'
import Orderform from '../views/orderform/index.vue'

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
      { path: '/orderform', name: 'orderform', component: Orderform }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
