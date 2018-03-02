import Web3 from 'web3'
import * as CoinContract from '../../../build/contracts/LionCoin.json'
const coinContractAddr = '0xD0a6Bb49ec2e2D54BA28388F30999e2bC3B7e3Da'

// initial state
const state = {
  network: {},
  coinContract: {},
  accounts: []
}

// getters
const getters = {
  getNetwork: state => state.network,
  getAccounts: state => state.accounts
}

// actions
const actions = {
  initializeWeb3: async function initializeWeb3({ commit, state }, web3) {
    // Check if Web3 has been injected by the browser:
    if (typeof web3 !== 'undefined') {
      // You have a web3 browser! Continue below!
      const web3Instance = new Web3(web3.currentProvider)
      const accounts = await web3Instance.eth.getAccounts()
      const networkId = await web3Instance.eth.net.getId()
      if (networkId !== 4) {
        window.alert(
          'Please connect to Rinkeby Testnet, change it in Metamask'
        )
        return
      }
      commit('setNetwork', 'Rinkeby')
      const coinContractractInstance = new web3Instance.eth.Contract(
        CoinContract.abi,
        coinContractAddr
      )
      const accountsWithBalances = await Promise.all(
        accounts.map(async account => ({
          address: account,
          balance: (
            (await coinContractractInstance.methods.balanceOf(account).call()) /
            10 ** 22
          ).toFixed(0)
        }))
      )
      commit('setAccounts', accountsWithBalances)
    } else {
      window.alert('Please download Metamask')
    }
  }
}

// mutations
const mutations = {
  setNetwork(state, network) {
    state.network = network
  },
  setAccounts(state, accounts) {
    state.accounts = accounts
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
