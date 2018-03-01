<template>
  <!-- Toaster Notification -->
  <v-snackbar
    @input="close"
    :bottom="true"
    :right="true"
    :timeout="timeout"
    :color="type"
    :value="isOn">
    {{ msg }}
    <v-btn flat dark @click.native="close">Close</v-btn>
  </v-snackbar>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import * as types from '../store/mutation-types'

  export default {
    name: 'ClNotification',
    methods: {
      close () {
        this.$store.commit(types.CLEAR_NOTIFICATION)
      }
    },
    computed: {
      ...mapGetters({
        isOn: 'isNotification',
        timeout: 'getNotificationTimeout',
        type: 'getNotificationType',
        msg: 'getNotificationMessage'
      })
    }
  }
</script>
