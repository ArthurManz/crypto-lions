import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import AllLionsPage from '@/pages/AllLionsPage'
import MyLionsPage from '@/pages/MyLionsPage'
import MarketPlacePage from '@/pages/MarketPlacePage'
import GetStartedPage from '@/pages/GetStartedPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/marketplace',
      name: 'MarketPlacePage',
      component: MarketPlacePage
    },
    {
      path: '/my-lions',
      name: 'MyLionsPage',
      component: MyLionsPage
    },
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
