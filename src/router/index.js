import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home/Home.vue'
import Loogin from '../views/loogin/loogin.vue'
import Code from '../views/loogin/code.vue'
import Orderform from '../views/orderform/quick.vue'
import Refund from '../views/orderform/refund.vue'
import Pair from '../views/orderform/pair.vue'
import Assess from '../views/orderform/assess.vue'
import Detail from '../views/orderform/detail.vue'
import Message from '../views/message/index.vue'
import Commodity from '../views/commodity/index.vue'
import Statistics from '../views/statistics/index.vue'
import Sett from '../views/sett/index.vue'
import Regiment from '../views/activity/regiment.vue'
import Seckill from '../views/activity/seckill.vue'
import Xinxione from '../views/information/xinxione.vue'
import Xinxitwo from '../views/information/xinxitwo.vue'
import Xinxithere from '../views/information/xinxithere.vue'
import Xinxifour from '../views/information/xinxifour.vue'
import verification from '../views/verification'
import Member from '../views/member'
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
      { path: '/refund', name: 'refund', component: Refund },
      { path: '/pair', name: 'refund', component: Pair },
      { path: '/assess', name: 'assess', component: Assess },
      { path: '/detail', name: 'detail', component: Detail },
      { path: '/commodity', name: 'commodity', component: Commodity },
      { path: '/statistics', name: 'statistics', component: Statistics },
      { path: '/set', name: 'set', component: Sett },
      { path: '/message', name: 'message', component: Message },
      { path: '/regiment', name: 'regiment', component: Regiment },
      { path: '/seckill', name: 'seckill', component: Seckill },
      { path: '/xinxione', name: 'xinxione', component: Xinxione },
      { path: '/xinxitwo', name: 'xinxitwo', component: Xinxitwo },
      { path: '/xinxithere', name: 'xinxithere', component: Xinxithere },
      { path: '/xinxifour', name: 'xinxifour', component: Xinxifour },
      { path: '/member', name: 'member', component: Member },
      { path: '/verification', name: 'verification', component: verification }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
