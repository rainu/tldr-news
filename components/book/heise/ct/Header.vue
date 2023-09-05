<template>

  <Figure v-if="value.Figure" :value="value.Figure" />

  <h1> {{ value.Title }} </h1>
  <h2> {{ value.Subtitle }} </h2>
  <h3> {{ value.Abstract}} </h3>

  <p> {{ value.Author}} </p>
</template>

<script>
import Figure from "~/components/book/heise/ct/Figure.vue";

export default {
  components: {Figure},
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