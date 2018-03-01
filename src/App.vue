<template>
  <v-app>
    <top-bar-component/>
    <v-content>
      <cl-loading v-if="isLoading"></cl-loading>
      <router-view v-if="!isLoading"></router-view>
    </v-content>
    <notification/>
  </v-app>
</template>

<script>
  import TopBarComponent from './components/cl-top-bar'
  import Notification from './components/cl-notification'
  import ClLoading from './components/cl-loading'
  import * as types from './store/mutation-types'
  import {mapGetters} from 'vuex'

  export default {
    name: 'App',
    components: {TopBarComponent, Notification, ClLoading},
    computed: {
      ...mapGetters({
        loading: 'getIsLoading'
      }),
      isLoading () {
        return (['HomePage', 'GetStartedPage'].indexOf(this.$route.name) === -1 && this.loading)
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
