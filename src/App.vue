<template>
  <v-app>
    <top-bar-component/>
    <v-content>
      <router-view/>
    </v-content>
    <notification/>
  </v-app>
</template>

<script>
  import TopBarComponent from './components/cl-top-bar'
  import Notification from './components/cl-notification'
  import * as types from './store/mutation-types'

  export default {
    name: 'App',
    components: {TopBarComponent, Notification},
    data () {
      return {
        title: ''
      }
    },
    created () {
      this.$store.dispatch('initializeWeb3', (window.web3))
      this.$store.dispatch('startLionsPolling')
    },
    beforeDestroy () {
      this.$store.commit(types.CLEAR_POLL_INTERVAL)
      this.$store.commit(types.CLEAR_POLL_INTERVAL_LIONS)
    }
  }
</script>
