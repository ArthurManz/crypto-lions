<template>
  <v-toolbar prominent color="yellow darken-3">
    <router-link tag="img" src="/static/lion-icon.png" height="50px" class="ml-5" :to="{name: 'HomePage'}" style="cursor: pointer !important;"/>
    <router-link tag="span" style="cursor: pointer !important;" :to="{name: 'HomePage'}">
    <v-toolbar-title class="headline brown--text hidden-xs-only">CryptoLions</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-text-field
      v-if="pageWithLions"
      class="mr-3"
      color="brown"
      label="Search Lion By Name"
      prepend-icon="search"
      single-line
      hide-details
      :value="search"
      @input="updateSearch"
    ></v-text-field>
    <span v-if="metamask">
      <v-tooltip bottom>
        <v-btn icon :to="{ name: 'AllLionsPage'}" slot="activator">
          <v-icon color="brown">apps</v-icon>
        </v-btn>
        <span>All Lions</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn icon :to="{ name: 'MarketPlacePage'}" slot="activator">
          <v-icon color="brown">shopping_basket</v-icon>
        </v-btn>
        <span>Marketplace</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn icon class="mr-5":to="{name: 'MyLionsPage'}" slot="activator">
          <v-icon color="brown">person</v-icon>
        </v-btn>
        <span>My Lions</span>
      </v-tooltip>
    </span>
    <span v-else>
      <v-btn flat class="mr-5" color="brown" href="https://metamask.io/" target="_blank">
        <v-icon color="brown" class="mr-2">extension</v-icon>
        <span class="hidden-xs-only">Download MetaMask Extension</span>
      </v-btn>
    </span>
  </v-toolbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../store/mutation-types'

  export default {
    name: 'ClTopBar',
    computed: {
      ...mapGetters({
        search: 'getSearch',
        metamask: 'getMetamask',
        connected: 'getConnected',
        myLionsIds: 'getMyLionsIds'
      }),
      pageWithLions () {
        return ['HomePage', 'GetStartedPage'].indexOf(this.$route.name) === -1
      }
    },
    methods: {
      updateSearch (value) {
        this.$store.commit(types.SET_SEARCH, value)
      }
    }
  }
</script>
