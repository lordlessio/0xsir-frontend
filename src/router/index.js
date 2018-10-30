import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import AddressDeatil from '@/page/address/_detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/search',
      name: 'Search',
      component: Index
    },
    {
      path: '/address/:address',
      name: 'address-detail',
      component: AddressDeatil
    },
    {
      path: '*',
      name: 'other',
      redirect: '/'
    }
  ]
})
