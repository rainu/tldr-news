<template>
  <v-row dense>
    <v-col cols="12" sm="6" v-for="rating of value.Ratings">
      <v-list density="compact" :bg-color="color">
        <v-list-item v-for="item of rating.Items">
          <template v-slot:prepend>
            <svg :viewBox="item.Icon.getAttribute('viewBox')"
                 :width="item.Icon.getAttribute('width')"
                 :height="item.Icon.getAttribute('height')"
                 v-html="item.Icon.innerHTML"></svg>
          </template>
          <v-list-item-title class="pl-2" v-text="item.Text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    color: {
      required: false
    }
  },
}

</script>

<style scoped>

</style>