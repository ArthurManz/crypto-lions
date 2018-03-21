<template>
  <v-toolbar prominent color="yellow darken-3">
    <img src="/static/lion-icon.png" height="50px" class="ml-5"/>
    <v-toolbar-title class="headline brown--text">CryptoLions</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon color="brown">search</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon color="brown">apps</v-icon>
    </v-btn>
    <v-btn icon class="mr-5">
      <v-icon color="brown">more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'ClTopBar',
    data () {
      return {
        title: 'Crypto Lions'
      }
    }
  }
</script>
