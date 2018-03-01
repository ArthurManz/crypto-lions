<template>
  <v-layout fluid class="background text-xs-center" wrap>
    <v-flex row>
      <v-progress-linear :indeterminate="true" class="my-0" color="brown"></v-progress-linear>
      <img src="/static/loading_gif.gif" alt="Loading...">
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'ClLoading'
  }
</script>

<style>
  .background {
    background-color: #26ad69;
    min-height: 95vh;
  }
</style>
