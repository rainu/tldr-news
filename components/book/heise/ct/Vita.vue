<template>
  <v-row>
    <v-col>
      <v-img :src="value.Image" aspect-ratio="4/3"></v-img>
    </v-col>
    <v-col align-self="end">
      <v-row dense>
        <v-col>
          <v-img :src="value.Signature"></v-img>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <p>{{value.Name}}</p>
        </v-col>
      </v-row>

    </v-col>
  </v-row>
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