<template>
  <v-card>
    <v-img :src="value.Source"></v-img>
    <div class="text-center font-weight-bold">{{value.Caption}}</div>
  </v-card>
</template>

<script>

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  }
}

</script>

<style scoped>

</style>