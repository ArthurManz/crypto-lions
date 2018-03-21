import * as types from '../mutation-types'

const state = {
  isOn: false,
  timeout: 3000,
  type: 'info',
  msg: ''
}

const getters = {
  isNotification: state => state.isOn,
  getNotificationTimeout: state => state.timeout,
  getNotificationType: state => state.type,
  getNotificationMessage: state => state.msg
}

const mutations = {
  [types.SHOW_NOTIFICATION] (state, data) {
    if (state.isOn) {
      state.timeout = 0
      state.isOn = false
    }
    state.timeout = data.timeout || 3000
    state.type = data.type || 'info'
    state.msg = data.msg
    state.isOn = true
  },
  [types.CLEAR_NOTIFICATION] (state) {
    state.isOn = false
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
