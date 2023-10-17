<template>
  <v-card>
    <v-card-text>
      <pre>{{value.Content}}</pre>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
}

</script>

<style scoped>
</style>