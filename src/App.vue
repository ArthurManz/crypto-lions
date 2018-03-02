<template>
  <v-app>
    <top-bar-component/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import TopBarComponent from './components/TopBarComponent'

export default {
  name: 'App',
  components: {TopBarComponent},
  data() {
    return {
      title: ''
    }
  },
  created() {
    this.$store.dispatch('initializeWeb3', (window.web3))
  }
}
</script>
