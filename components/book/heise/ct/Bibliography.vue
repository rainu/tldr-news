<template>
  <v-list>
    <v-list-subheader v-if="value.Title">
      <h2>{{value.Title}}</h2>
    </v-list-subheader>
    <v-list-item v-for="(item, i) of value.Items" :key="i">
      <template v-slot:prepend>
        <span class="pr-1">[{{i + 1}}]</span>
      </template>
      <a :href="item.Link" target="_blank"> {{item.Text}} </a>
    </v-list-item>
  </v-list>
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