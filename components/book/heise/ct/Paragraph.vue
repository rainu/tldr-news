<template>
  <p>
    {{value.Content}}
  </p>
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