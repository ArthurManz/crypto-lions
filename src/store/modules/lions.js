import LionContract from '../lion-contract'
import * as types from '../mutation-types'
import { mapLionProperties } from '../utils'

const state = {
  search: '',
  lions: [],
  myLions: [],
  marketPlace: [],
  poolInterval: 0
}

const POLL_INTERVAL_IN_MILLIS = 10 * 1000 // 10 seconds
const ETH_SCAN_TX_URL = 'https://rinkeby.etherscan.io/tx/'
const ETH_BUY_PRICE = 5000000000000000 // 0.005 eth

const getters = {
  getSearch: state => state.search,
  getAllLions: state => state.lions,
  getMyLions: state => state.myLions,
  getMarketPlace: state => state.marketPlace,
  getMyLionsIds: state => state.myLionsIds
}

const mutations = {
  [types.IS_MY_LION] (state, id) {
    state.lions[id].ownedByMe = true
  },
  [types.SET_ALL_LIONS] (state, lions) {
    state.lions = lions
  },
  [types.SET_SEARCH] (state, search) {
    state.search = search
  },
  [types.SET_MY_LIONS] (state, lions) {
    state.myLions = lions
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
  async getAllLions ({commit, rootState}) {
    let lions = []
    const contract = LionContract()
    if (typeof contract === 'undefined') return
    const count = await contract.methods.getLionsCount().call()
    for (let i = 0; i < count; i++) {
      const lion = await contract.methods.lions(i).call()
      lions.push(lion)
    }
    commit(types.SET_ALL_LIONS, lions.map(mapLionProperties))
    commit(types.SET_MARKETPLACE, lions.map(mapLionProperties).filter(l => !!l.onMarket))
    if (rootState.web3.account) {
      commit(types.SET_MY_LIONS, lions.map(mapLionProperties).filter(lion => lion.owner === rootState.web3.account))
    } else {
      commit(types.SET_MY_LIONS, [])
    }
  },
  startLionsPolling ({commit, dispatch}) {
    const interval = setInterval(() => dispatch('getAllLions'), POLL_INTERVAL_IN_MILLIS)
    commit(types.SET_POLL_INTERVAL_LIONS, interval)
  },
  buyLion ({rootState, commit}, lionId) {
    checkIfUserHaveEtherBalance(arguments[0])
      .then(() => {
        const contract = LionContract()
        contract.methods.buyLion(lionId).send({from: rootState.web3.account, value: ETH_BUY_PRICE})
          .on('transactionHash', (h) => {
            commit(types.SHOW_NOTIFICATION, {msg: `Sent Tx with hash: ${h}`, type: 'info'})
            setTimeout(() => window.open(ETH_SCAN_TX_URL + h), '_blank', 2000)
          })
          .on('confirmation', (confirmationNumber, receipt) => {
            if (confirmationNumber > 2 && confirmationNumber < 3) {
              if (receipt) commit(types.SHOW_NOTIFICATION, {msg: `Confirmed transaction`, type: 'success'})
              commit(types.SHOW_NOTIFICATION, {msg: `Failed transaction`, type: 'error'})
            }
          })
          .on('error', (error) => {
            commit(types.SHOW_NOTIFICATION, {msg: 'Failed transaction', type: 'error'})
            console.log(error)
          })
      })
      .catch(console.log)
  },
  sellLion ({rootState, commit}, {lionId, price}) {
    checkIfUserHaveEtherBalance(arguments[0])
      .then(() => {
        const contract = LionContract()
        contract.methods.putLionOnMarket(lionId, price * (10 ** rootState.web3.decimals)).send({from: rootState.web3.account})
          .on('transactionHash', (h) => {
            commit(types.SHOW_NOTIFICATION, {msg: `Sent Tx with hash: ${h}`, type: 'info'})
            setTimeout(() => window.open(ETH_SCAN_TX_URL + h), '_blank', 2000)
          })
          .on('confirmation', (confirmationNumber, receipt) => {
            if (confirmationNumber > 2 && confirmationNumber < 3) {
              if (receipt) commit(types.SHOW_NOTIFICATION, {msg: `Confirmed transaction`, type: 'success'})
              commit(types.SHOW_NOTIFICATION, {msg: `Failed transaction`, type: 'error'})
            }
          })
          .on('error', (error) => {
            commit(types.SHOW_NOTIFICATION, {msg: 'Failed transaction', type: 'error'})
            console.log(error)
          })
      })
      .catch(console.log)
  },
  changeLionPrice ({rootState, commit}, {lionId, price}) {
    checkIfUserHaveEtherBalance(arguments[0])
      .then(() => {
        const contract = LionContract()
        contract.methods.setLionPrice(lionId, price * (10 ** rootState.web3.decimals)).send({from: rootState.web3.account})
          .on('transactionHash', (h) => {
            commit(types.SHOW_NOTIFICATION, {msg: `Sent Tx with hash: ${h}`, type: 'info'})
            setTimeout(() => window.open(ETH_SCAN_TX_URL + h), '_blank', 2000)
          })
          .on('confirmation', (confirmationNumber, receipt) => {
            if (confirmationNumber > 2 && confirmationNumber < 3) {
              if (receipt) commit(types.SHOW_NOTIFICATION, {msg: `Confirmed transaction`, type: 'success'})
              commit(types.SHOW_NOTIFICATION, {msg: `Failed transaction`, type: 'error'})
            }
          })
          .on('error', (error) => {
            commit(types.SHOW_NOTIFICATION, {msg: 'Failed transaction', type: 'error'})
            console.log(error)
          })
      })
      .catch(console.log)
  },
  cancelLionOnMarket ({rootState, commit}, lionId) {
    checkIfUserHaveEtherBalance(arguments[0])
      .then(() => {
        const contract = LionContract()
        contract.methods.cancelLionOnMarket(lionId).send({from: rootState.web3.account})
          .on('transactionHash', (h) => {
            commit(types.SHOW_NOTIFICATION, {msg: `Sent Tx with hash: ${h}`, type: 'info'})
            setTimeout(() => window.open(ETH_SCAN_TX_URL + h), '_blank', 2000)
          })
          .on('confirmation', (confirmationNumber, receipt) => {
            if (confirmationNumber > 2 && confirmationNumber < 3) {
              if (receipt) commit(types.SHOW_NOTIFICATION, {msg: `Confirmed transaction`, type: 'success'})
              commit(types.SHOW_NOTIFICATION, {msg: `Failed transaction`, type: 'error'})
            }
          })
          .on('error', (error) => {
            commit(types.SHOW_NOTIFICATION, {msg: 'Failed transaction', type: 'error'})
            console.log(error)
          })
      })
      .catch(console.log)
  }
}

function checkIfUserHaveEtherBalance ({rootState, commit}) {
  return new Promise((resolve, reject) => {
    if (rootState.web3.balance.ether > 0) {
      resolve(true)
      return
    }
    commit(types.SHOW_NOTIFICATION, {msg: `Not enough Ether balance!`, type: 'error'})
    reject(new Error('Not enough Ether balance!'))
  })
}

export default {
  state,
  getters,
  mutations,
  actions
}
