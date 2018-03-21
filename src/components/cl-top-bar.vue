<template>
  <v-toolbar prominent color="yellow darken-3">
    <a href="/">
    <img src="/static/lion-icon.png" height="50px" class="ml-5"/>
    </a>
    <v-toolbar-title class="headline brown--text hidden-xs-only" href="/">CryptoLions</v-toolbar-title>
    <v-spacer></v-spacer>
    <span v-if="connected">
      <v-btn icon :to="{ name: 'AllLionsPage'}">
        <v-icon color="brown">search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="brown">shopping_basket</v-icon>
      </v-btn>
      <v-btn icon>
        <v-badge class="mr-5" color="brown">
          <span slot="badge">{{totalLions}}</span>
          <v-icon color="brown">person</v-icon>
        </v-badge>
      </v-btn>
    </span>
    <span v-else>
      <v-btn flat class="mr-5" color="brown" href="https://metamask.io/" target="_blank">
        <v-icon color="brown" class="mr-2">extension</v-icon>
        Download MetaMask Extension
      </v-btn>
    </span>
  </v-toolbar>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ClTopBar',
    computed: {
      ...mapGetters({
        connected: 'getConnected',
        myLionsIds: 'getMyLionsIds'
      }),
      colorConnected () {
        return this.connected ? 'green' : 'red'
      },
      totalLions () {
        if (typeof this.myLionsIds === 'undefined') return '?'
        return this.myLionsIds.length
      }
    },
    data () {
      return {
        title: 'Crypto Lions'
      }
    }
  }
</script>
