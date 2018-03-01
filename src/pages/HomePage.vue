<template>
  <div>
    <section>
      <v-parallax src="static/background.jpg" height="450">
        <v-layout
          column
          align-center
          justify-center
          class="white--text"
        >
          <img src="static/lion-icon.png" alt="Lion Icon" height="270">
          <h1 class="white--text mb-2 display-2 text-xs-center hidden-xs-only">Welcome to Crypto Lions</h1>
          <h2 class="display-1 mb-1 text-xs-center">Ethereum, made simple</h2>
        </v-layout>
      </v-parallax>
    </section>
    <section>
      <v-layout
        column
        wrap
        class="my-2"
        align-center
      >
        <v-flex xs12 sm5 class="my-2">
          <div class="text-xs-center">
            <h2 class="headline">The best way to start learning Ethereum</h2>
            <v-btn
              class="yellow darken-3 my-3"
              dark
              large
              @click="getFreeTokens"
            >
              Get your first free tokens
            </v-btn>
            <v-btn
              class="green darken-3 my-3"
              dark
              large
              :to="{ name: 'GetStartedPage'}"
            >
              More Information
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="green--text text--darken-2">color_lens</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Smart Contracts</div>
                  </v-card-title>
                  <v-card-text>
                    This project uses Solidity language to program all logic behind all our lions. From generation of
                    new lions to selling or buying, the rules and state will be always aligned and consistent worldwide.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="green--text text--darken-2">flash_on</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Using Tokens</div>
                  </v-card-title>
                  <v-card-text>
                    Learn how to issue your own tokens and create a marketplace where you can monetize transactions
                    and have full price control of your assets. We use Ethereum Standard ERC20.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="green--text text--darken-2">build</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Open Sourced</div>
                  </v-card-title>
                  <v-card-text>
                    All the code used to develop this Distributed Application (DAPP) will be open sourced, including
                    documentation and presentations. Feel free to contribute and extend it.
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
            <div class="body-2" v-if="isConnected === 'Connected'">
              <p class="body-1 ma-0">Account: {{ account }}</p>
              <p class="body-1 ma-0">Lion Coin Balance: {{ balance.token | token }}</p>
              <p class="body-1 mt-0">Ether Balance: {{ balance.ether | token }}</p>
            </div>
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
        account: 'getAccount',
        network: 'getNetwork',
        connected: 'getConnected',
        balance: 'getBalance'
      }),
      isConnected () {
        return this.connected ? 'Connected' : 'Disconnected'
      }
    },
    data () {
      return {
        title: 'Crypto Lions'
      }
    },
    methods: {
      getFreeTokens () {
        this.$store.dispatch('getFreeTokens')
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
