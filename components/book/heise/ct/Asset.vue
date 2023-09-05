<template>
  <v-card color="grey">
    <v-card-title>{{value.Title}}</v-card-title>
    <v-card-subtitle>{{value.Subtitle}}</v-card-subtitle>
    <v-card-text>
      <v-row v-for="content of value.Content">
        <v-col>
          <Paragraph v-if="content.t === 'paragraph'" :value="content"></Paragraph>
          <template v-else-if="content.t === 'figure'">
            <v-row>
              <v-col cols="1"></v-col>
              <v-col cols="10">
                <Figure :value="content" />
              </v-col>
              <v-col cols="1"></v-col>
            </v-row>
          </template>
          <Rating v-else-if="content.t === 'rating'" :value="content" color="grey"></Rating>
          <v-list v-else-if="content.t === 'listing'">
            <v-list-item v-for="(item, i) of content.Items" :key="i" density="compact">
              <template v-slot:prepend>
                <v-icon>mdi-octagram</v-icon>
              </template>
              <span>{{item.Text}}</span>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

import Paragraph from "~/components/book/heise/ct/Paragraph.vue";
import Figure from "~/components/book/heise/ct/Figure.vue";
import Rating from "~/components/book/heise/ct/Rating.vue";

export default {
  components: {Rating, Figure, Paragraph},
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