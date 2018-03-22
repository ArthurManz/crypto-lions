<template>
  <div>
    <section>
      <v-layout
        column
        align-center
        justify-center
      >
        <v-flex xs12 sm8 class="my-3">
          <div class="text-xs-left" v-html=md_text>
          </div>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>
  import * as howtoText from '../content/howto.json'

  let marked = require('marked')

  export default {
    name: 'GetStartedPage',
    data () {
      return {
        md_text: marked(howtoText['text'], {
          pedantic: false,
          gfm: true,
          tables: true,
          breaks: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
          xhtml: false
        })
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
