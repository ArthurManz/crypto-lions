import Vue from 'vue'
import Vuex from 'vuex'
import web3 from './modules/web3'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    web3
  },
  strict: debug
})
