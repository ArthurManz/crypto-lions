<template>
  <div>
    <loading :show="true"></loading>
    <section>
      <v-layout
        column
        align-center
        justify-center
      >
        <v-flex xs12 sm8 class="my-3">
          <div v-html="md_text"></div>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>
  import Loading from 'vue-full-loading'
  import marked from 'marked'
  const URL_README = 'https://raw.githubusercontent.com/ArthurManz/ethereum-ico-workshop/master/' +
    'README.md?token=AL4c4TFiV8hH5Dc96o70jsnilN-cuVC6ks5avV_SwA%3D%3D'

  export default {
    name: 'GetStartedPage',
    components: {Loading},
    data () {
      return {
        md_text: ''
      }
    },
    async created () {
      fetch(URL_README)
        .then(async (res) => {
          this.md_text = marked(await res.text(), { sanitize: true })
        })
        .catch(console.log)
    }
  }
</script>
