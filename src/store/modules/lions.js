import LionContract from '../lion-contract'
import * as types from '../mutation-types'
import { mapLionProperties } from '../utils'

const state = {
  lions: [],
  myLionsIds: [],
  marketPlace: []
}

const getters = {
  getAllLions: state => state.lions,
  getMyLions: state => state.lions.filter((lion, index) => state.myLionsIds.indexOf(index) > -1),
  getMarketPlace: state => state.marketPlace
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
  }
}

const actions = {
  async getAllLions ({commit}) {
    let lions = []
    const contract = LionContract()
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
    console.log(rootState.web3.account)
    const lionsIds = await contract.methods.getLionsByOwner(rootState.web3.account).call()
    commit(types.SET_MY_LIONS, lionsIds)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
