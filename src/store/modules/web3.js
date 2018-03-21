import Web3 from 'web3'
import LionContract from '../lion-contract'
import * as types from '../mutation-types'

// initial state
const state = {
  connected: false,
  network: 'Not Available',
  account: '',
  balance: {
    ether: 0,
    token: 0
  },
  poolInterval: 0
}

const POLL_INTERVAL_IN_MILLIS = 3 * 1000 // 2 seconds

// getters
const getters = {
  getNetwork: state => state.network,
  getAccount: state => state.account,
  getConnected: state => state.connected,
  getBalance: state => state.balance
}

// actions
const actions = {
  async initializeWeb3 ({commit, dispatch, state}, web3) {
    if (!state.connected) {
      // Check if Web3 has been injected by Metamask into the browser
      if (typeof web3 !== 'undefined') {
        // Attach web3 instance to window
        window.web3 = new Web3(web3.currentProvider)
        const networkId = await window.web3.eth.net.getId()
        if (networkId !== 4) {
          commit([types.SHOW_NOTIFICATION], {
            msg: 'Please connect to Rinkeby Testnet, change it in Metamask',
            type: 'error'
          })
          return
        }
        commit(types.SET_CONNECTED, true)
        commit(types.SET_NETWORK, 'Rinkeby')
      } else {
        commit(types.SET_CONNECTED, false)
        commit(types.SHOW_NOTIFICATION, { msg: 'Please install Metamask extension in your browser' })
      }
    }
    dispatch('getAccountAndBalances')
    if (state.connected) commit(types.SHOW_NOTIFICATION, { msg: 'Great! Connected with Metamask' })
    dispatch('startPolling')
  },
  async getAccountAndBalances ({commit}) {
    const [account] = await getAccounts()
    if (typeof account === 'undefined' || !account) {
      // Disconnected/Logout from Metamask
      commit(types.SET_CONNECTED, false)
      return
    }
    commit(types.SET_CONNECTED, true)
    const ethBalance = await window.web3.eth.getBalance(account)
    commit(types.SET_ACCOUNT, account)
    commit(types.SET_ETH_BALANCE, ethBalance)
    const contract = LionContract()
    const DECIMALS = await contract.methods.decimals().call()
    const tokens = await contract.methods.balanceOf(account).call()
    commit(types.SET_TOKEN_BALANCE, (tokens / 10 ** DECIMALS).toFixed(0))
  },
  startPolling ({commit, dispatch}) {
    const interval = setInterval(() => dispatch('getAccountAndBalances'), POLL_INTERVAL_IN_MILLIS)
    commit(types.SET_POLL_INTERVAL, interval)
  }
}

function getAccounts () {
  if (typeof window.web3 === 'undefined') return []
  return window.web3.eth.getAccounts()
}

// mutations
const mutations = {
  [types.SET_CONNECTED] (state, connected) {
    state.connected = connected
    if (!connected) state.account = ''
  },
  [types.SET_NETWORK] (state, network) {
    state.network = network
  },
  [types.SET_ACCOUNT] (state, account) {
    state.account = account
  },
  [types.SET_TOKEN_BALANCE] (state, tokens) {
    state.balance.token = tokens
  },
  [types.SET_ETH_BALANCE] (state, ether) {
    state.balance.ether = ether
  },
  [types.SET_POLL_INTERVAL] (state, interval) {
    state.poolInterval = interval
  },
  [types.CLEAR_POLL_INTERVAL] (state) {
    clearInterval(state.poolInterval)
    state.poolInterval = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
