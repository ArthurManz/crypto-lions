import LionContract from '../lion-contract'
import * as types from '../mutation-types'
import { mapLionProperties } from '../utils'

const state = {
  lions: [],
  myLionsIds: [],
  marketPlace: [],
  poolInterval: 0
}

const POLL_INTERVAL_IN_MILLIS = 5 * 1000 // 5 seconds

const getters = {
  getAllLions: state => state.lions,
  getMyLions: state => state.lions.filter((lion, index) => state.myLionsIds.indexOf(index) > -1),
  getMarketPlace: state => state.marketPlace,
  getMyLionsIds: state => state.myLionsIds
}

const mutations = {
  [types.SET_ALL_LIONS] (state, lions) {
    state.lions = lions
  },
  [types.SET_MY_LIONS] (state, ids) {
    state.myLionsIds = ids
  },
  [types.SET_MARKETPLACE] (state, lions) {
    state.marketPlace = lions
  },
  [types.SET_POLL_INTERVAL_LIONS] (state, interval) {
    state.poolInterval = interval
  },
  [types.CLEAR_POLL_INTERVAL_LIONS] (state) {
    clearInterval(state.poolInterval)
  }
}

const actions = {
  async getAllLions ({commit}) {
    let lions = []
    const contract = LionContract()
    if (typeof contract === 'undefined') return
    const count = await contract.methods.getLionsCount().call()
    for (let i = 0; i < count; i++) {
      const lion = await contract.methods.lions(i).call()
      lions.push(lion)
    }
    commit(types.SET_MARKETPLACE, lions.filter(l => !!l.onMarket))
    commit(types.SET_ALL_LIONS, lions.map(mapLionProperties))
  },
  async getMyLions ({commit, rootState}) {
    const contract = LionContract()
    if (typeof contract === 'undefined') return
    const lionsIds = await contract.methods.getLionsByOwner(rootState.web3.account).call()
    commit(types.SET_MY_LIONS, lionsIds)
  },
  startLionsPolling ({commit, dispatch}) {
    const interval = setInterval(() => dispatch('getAllLions'), POLL_INTERVAL_IN_MILLIS)
    commit(types.SET_POLL_INTERVAL_LIONS, interval)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
