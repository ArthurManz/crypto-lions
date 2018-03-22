import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import AllLionsPage from '@/pages/AllLionsPage'
import GetStartedPage from '@/pages/GetStartedPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/all',
      name: 'AllLionsPage',
      component: AllLionsPage
    },
    {
      path: '/getstarted',
      name: 'GetStartedPage',
      component: GetStartedPage
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
