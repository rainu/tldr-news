<template>
  <p>
    <strong class="pr-1">{{value.Description}}</strong>
    <a :href="value.Link">{{value.Link}}</a>
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