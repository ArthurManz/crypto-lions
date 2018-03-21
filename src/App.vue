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
      this.$store.dispatch('getAllLions')
      setTimeout(() => this.$store.dispatch('getMyLions'), 5000)
    }
  }
</script>
