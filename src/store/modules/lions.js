import LionContract from '../lion-contract'
import * as types from '../mutation-types'

const state = {
  lions: [],
  myLions: [],
  marketPlace: []
}

const getters = {
  getAllLions: state => state.lions,
  getMyLions: state => state.myLions,
  getMarketPlace: state => state.marketPlace
}

const mutations = {
  [types.SET_ALL_LIONS] (state, lions) {
    state.lions = lions
  },
  [types.SET_MY_LIONS] (state, lions) {
    state.myLions = lions
  },
  [types.SET_MARKETPLACE] (state, lions) {
    state.marketPlace = lions
  }
}

const actions = {
  async getAllLions ({commit}) {
    const contract = LionContract()
    const lions = await contract.methods.lions().call()
    commit(types.SET_ALL_LIONS, lions)
  },
  async getMyLions ({commit}) {
    const contract = LionContract()
    const lions = await contract.methods.lions().call()
    commit(types.SET_ALL_LIONS, lions)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
