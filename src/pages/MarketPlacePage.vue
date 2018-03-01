<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
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
              <v-list-tile-content class="align-end">{{ props.item.location.name }}, {{ props.item.location.country }}
              </v-list-tile-content>
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
            <v-spacer></v-spacer>
            <v-btn small
                   color="yellow darken-3 brown--text"
                   @click="buyLion(props.item)"
                   :disabled="props.item.owner === account">
              Buy for {{ props.item.price | token }} LC
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <template slot="no-data">
        <v-alert :value="true" color="brown" icon="info" class="ma-5">
          <img src="/static/lion-icon.png" height="50px"/>
          <p>Currently, there are no lions for sale :(</p>
        </v-alert>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { SHOW_NOTIFICATION } from '../store/mutation-types'
  import ClLionIcon from '../components/cl-lion-icon'

  const API_KEY_GOOGLE = 'AIzaSyD32e6qVtLM4FCIJx2vk4WanId3Xu5wLOU'

  export default {
    name: 'MarketPlacePage',
    components: {ClLionIcon},
    computed: {
      ...mapGetters({
        balance: 'getBalance',
        search: 'getSearch',
        account: 'getAccount',
        lions: 'getMarketPlace',
        isLoading: 'getIsLoading'
      })
    },
    data: () => ({
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      apiKey: API_KEY_GOOGLE,
      location: '0,0'
    }),
    created () {
      this.$store.dispatch('getAllLions')
    },
    methods: {
      buyLion (lion) {
        if (this.balance.ether < 5 * 10 ** 15) {
          this.$store.commit(SHOW_NOTIFICATION, {type: 'error', msg: 'You have not enough Ether!'})
          return
        }
        if ((this.balance.token / (10 ** 18)) < (lion.price / (10 ** 18))) {
          this.$store.commit(SHOW_NOTIFICATION, {
            type: 'error',
            msg: 'You have not enough Lion Coins to buy this lion!'
          })
          return
        }
        this.$store.dispatch('buyLion', lion.id)
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
