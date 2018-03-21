<template>
  <v-container fluid grid-list-md>
      <v-data-iterator
        content-tag="v-layout"
        row
        wrap
        :items="lions"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
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
            <v-card-media contain src="/static/lion-icon.png" height="250px"></v-card-media>
            <v-divider></v-divider>
            <v-card-title>
              <h4>{{ props.item.firstName }} {{ props.item.middleName }} {{ props.item.lastName }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Birth Place:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.birthPlace }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Eyes Type:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.eyesType }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Eyes Colour:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.eyesColour }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Fur Colour:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.furColour }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Mane Colour:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.maneColour }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-card-actions>
              <v-btn small color="yellow darken-3">View Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">
            No lions
          </v-alert>
        </template>
      </v-data-iterator>
    </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'AllLionsPage',
    computed: {
      ...mapGetters({
        lions: 'getAllLions'
      })
    },
    data: () => ({
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
    }),
    created () {
      this.$store.dispatch('getAllLions')
    }
  }
</script>

<style scoped>

</style>
