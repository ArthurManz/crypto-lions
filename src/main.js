// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf
// with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.filter('capitalize', capitalize)
Vue.filter('token', token)
Vue.config.productionTip = false

export function capitalize (value) {
  if (!value && value !== 0) {
    return ''
  }
  value = value.toString().toLowerCase()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function token (value) {
  if (!value) return ''
  return value / (10 ** 18)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  store
})
