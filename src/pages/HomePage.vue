<template>
<div>
  <section>
    <v-parallax src="static/background.jpg" height="500">
      <v-layout
        column
        align-center
        justify-center
        class="white--text"
      >
        <img src="static/lion-icon.png" alt="Lion Icon" height="300">
        <h1 class="white--text mb-2 display-2 text-xs-center">Welcome to Crypto Lions</h1>
        <h2 class="display-1 mb-1 text-xs-center">Ethereum, made simple</h2>
        <v-btn
          class="yellow darken-3 mt-4"
          dark
          large
        >
          Get Started
        </v-btn>
      </v-layout>
    </v-parallax>
  </section>
  <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best way to start learning Ethereum</h2>
              <span class="subheading">
                Cras facilisis mi vitae nunc 
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Smart Contracts</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Using Tokens</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Open Sourced</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">Network: {{ network }}</h2>
              <h2 class="subheading">Status: {{ isConnected }}</h2>
              <ul class="body-2" v-if="isConnected === 'Connected'">
                <div v-for="account in accounts" :key="account.address">
                  <p class="body-1 ma-0">Account: {{ account.address }}</p>
                  <p class="body-1 mt-0">Balance: {{ account.balance }}</p>
                </div>
              </ul>
            </div>
          </v-flex>
        </v-layout>
      </section>
</div>
  
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  computed: {
    ...mapGetters({
      accounts: 'getAccounts',
      network: 'getNetwork'
    }),
    isConnected() {
      console.log(this.network)
      return this.network ? 'Connected' : 'Disconnected'
    }
  },
  data() {
    return {
      title: 'Crypto Lions'
    }
  }
}
</script>

<style scoped>
.overlay {
  opacity: 0.4;
  filter: alpha(opacity=40); /* msie */
  background-color: #000;
}
</style>
