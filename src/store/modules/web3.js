import Web3 from 'web3'
import LionContract from '../lion-contract'
import * as types from '../mutation-types'

// initial state
const state = {
  isLoading: false,
  metamask: false,
  connected: false,
  network: 'Not Available',
  account: '',
  decimals: 0,
  balance: {
    ether: 0,
    token: 0
  },
  poolInterval: 0
}

const ETH_SCAN_TX_URL = 'https://rinkeby.etherscan.io/tx/'
const POLL_INTERVAL_IN_MILLIS = 3 * 1000 // 2 seconds

// getters
const getters = {
  getNetwork: state => state.network,
  getAccount: state => state.account,
  getDecimals: state => state.decimals,
  getConnected: state => state.connected,
  getMetamask: state => state.metamask,
  getIsLoading: state => state.isLoading,
  getBalance: state => state.balance,
  isEther: state => state.balance.ether > 0
}

// actions
const actions = {
  async initializeWeb3 ({commit, dispatch, state}, web3) {
    if (!state.connected) {
      commit(types.IS_LOADING, true)
      // Check if Web3 has been injected by Metamask into the browser
      if (typeof web3 !== 'undefined') {
        commit(types.METAMASK, true)
        // Attach web3 instance to window
        window.web3 = new Web3(web3.currentProvider)
        const networkId = await window.web3.eth.net.getId()
        if (networkId !== 4) {
          commit(types.SHOW_NOTIFICATION, {
            msg: 'Please connect to Rinkeby Testnet, change it in Metamask',
            type: 'error'
          })
          return
        }
        commit(types.SET_CONNECTED, true)
        commit(types.SET_NETWORK, 'Rinkeby')
      } else {
        commit(types.SET_CONNECTED, false)
        commit(types.METAMASK, false)
        commit(types.SHOW_NOTIFICATION, { msg: 'Please install Metamask extension in your browser' })
      }
    }
    if (state.connected) commit(types.SHOW_NOTIFICATION, { msg: 'Great! Connected with Metamask' })
    dispatch('getAccountAndBalances')
    dispatch('getAllLions').then(() => {
      commit(types.IS_LOADING, false)
    })
    dispatch('startPolling')
  },
  async getAccountAndBalances ({commit}) {
    const [account] = await getAccounts()
    if (typeof account === 'undefined' || !account) {
      // Disconnected/Logout from Metamask
      commit(types.SET_CONNECTED, false)
      return
    }
    window.web3.eth.defaultAccount = account
    commit(types.SET_CONNECTED, true)
    const ethBalance = await window.web3.eth.getBalance(account)
    commit(types.SET_ACCOUNT, account)
    commit(types.SET_ETH_BALANCE, ethBalance)
    const contract = LionContract()
    const DECIMALS = await contract.methods.decimals().call()
    commit(types.SET_DECIMALS, DECIMALS)
    const tokens = await contract.methods.balanceOf(account).call()
    commit(types.SET_TOKEN_BALANCE, tokens)
  },
  startPolling ({commit, dispatch}) {
    const interval = setInterval(() => dispatch('getAccountAndBalances'), POLL_INTERVAL_IN_MILLIS)
    commit(types.SET_POLL_INTERVAL, interval)
  },
  getFreeTokens ({commit}) {
    const contract = LionContract()
    if (!state.account) {
      commit(types.SHOW_NOTIFICATION, {type: 'error', msg: 'Please, login or create an account first using Metamask'})
    }
    contract.methods.getTokens().send({from: state.account})
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
  }
}

function getAccounts () {
  if (typeof window.web3 === 'undefined') return []
  return window.web3.eth.getAccounts()
}

// mutations
const mutations = {
  [types.IS_LOADING] (state, isLoading) {
    state.isLoading = isLoading
  },
  [types.METAMASK] (state, metamask) {
    state.metamask = metamask
  },
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
  [types.SET_DECIMALS] (state, decimals) {
    state.decimals = decimals
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
