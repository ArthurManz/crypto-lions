<template>
  <v-container fluid grid-list-md>
      <v-data-iterator
        v-if="account"
        content-tag="v-layout"
        row
        wrap
        :search="search"
        :items="lions"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        :loading="isLoading"
      >
        <v-flex
          slot="item"
          slot-scope="props"
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-card-title>
              <v-flex xs12>
                <cl-lion-icon :colors="props.item.colors"></cl-lion-icon>
                <h4 class="text-xs-center title">{{ props.item.firstName }} the {{ props.item.adjective | capitalize}}</h4>
              </v-flex>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>From</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.location.name }}, {{ props.item.location.country }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-card-media contain height="200px">
              <iframe
                width="100%"
                height="200px"
                frameborder="0" style="border:0"
                :src="`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${props.item.location.lat},${props.item.location.lng}&zoom=10`">
              </iframe>
            </v-card-media>
            <v-card-actions>
              <v-btn small outline color="red darken-2" @click="cancelSale(props.item.id)" v-if="props.item.onMarket">
                Cancel Sale
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn small color="yellow darken-3 brown--text" @click="openSellDialog(props.item)" v-if="!props.item.onMarket">
                Sell
              </v-btn>
              <v-btn small color="yellow darken-3 brown--text" @click="openSellDialog(props.item)" v-if="props.item.onMarket">
                Change Price
              </v-btn>
              <v-dialog v-model="dialog" persistent max-width="350px">
                <v-card>
                  <v-card-title>
                    <div>
                      <cl-lion-icon :colors="selectedLion.colors"></cl-lion-icon>
                      <p class="title mb-1 mt-2 text-xs-center">Set new price for</p>
                      <p class="headline mb-0 text-xs-center">{{selectedLion.firstName}} the {{selectedLion.adjective | capitalize}}</p>
                      <p class="subheading mb-1 mt-0 text-xs-center">Current price: {{selectedLion.price | token}} LC</p>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field v-model="price" label="Price in Lion Coins" type="number" min="1" suffix="LC" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="red darken-3" small outline @click.native="dialog = false">Close</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="yellow darken-3" small @click="newPrice(selectedLion.id)">Send</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
        <template slot="no-data">
          <v-alert :value="true" color="brown" icon="info" class="ma-5">
            <img src="/static/lion-icon.png" height="50px"/>
            <p>You still have no lions :(</p>
          </v-alert>
        </template>
      </v-data-iterator>
      <v-alert v-else :value="true" color="brown" icon="info" class="ma-5">
        <img src="/static/lion-icon.png" height="50px"/>
        <h2>You are not logged in to Metamask</h2>
        <p>Please log in, to see your lions :)</p>
      </v-alert>
    </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {SHOW_NOTIFICATION} from '../store/mutation-types'
  import ClLionIcon from '../components/cl-lion-icon'
  const API_KEY_GOOGLE = 'AIzaSyD32e6qVtLM4FCIJx2vk4WanId3Xu5wLOU'

  export default {
    name: 'MyLionsPage',
    components: {ClLionIcon},
    computed: {
      ...mapGetters({
        enoughEther: 'isEther',
        search: 'getSearch',
        account: 'getAccount',
        lions: 'getMyLions',
        isLoading: 'getIsLoading'
      })
    },
    data: () => ({
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      apiKey: API_KEY_GOOGLE,
      location: '0,0',
      dialog: false,
      selectedLion: {},
      price: ''
    }),
    created () {
      this.$store.dispatch('getAllLions')
    },
    methods: {
      openSellDialog (lion) {
        this.dialog = true
        this.selectedLion = lion
      },
      newPrice (lionId) {
        if (!this.price || this.price === 0) {
          this.$store.commit(SHOW_NOTIFICATION, {type: 'error', msg: 'Price must be greater than 0!'})
          return
        }
        if (this.selectedLion.onMarket) {
          this.changePrice(lionId)
        } else {
          this.sellLion(lionId)
        }
      },
      sellLion (lionId) {
        this.$store.dispatch('sellLion', { lionId: lionId, price: this.price })
        this.dialog = false
      },
      changePrice (lionId) {
        this.$store.dispatch('changeLionPrice', { lionId: lionId, price: this.price })
        this.dialog = false
      },
      cancelSale (lionId) {
        this.$store.dispatch('cancelLionOnMarket', lionId)
      }
    }
  }
</script>

<style scoped>
  img {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }
</style>
