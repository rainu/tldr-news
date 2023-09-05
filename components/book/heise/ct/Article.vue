<template>
  <v-container fluid>
    <template v-for="content of article.Content">
      <template v-if="content.t === 'section'">
        <v-row v-if="content.Title">
          <v-col>
            <h3>{{content.Title}}</h3>
          </v-col>
        </v-row>
        <v-row v-for="sectionContent of content.Content">
          <v-col>
            <Paragraph v-if="sectionContent.t === 'paragraph'" :value="sectionContent" />
            <template v-else-if="sectionContent.t === 'figure'">
              <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="10">
                  <Figure :value="sectionContent" />
                </v-col>
                <v-col cols="1"></v-col>
              </v-row>
            </template>
          </v-col>
        </v-row>
      </template>
      <v-row v-else>
        <v-col>
          <Header v-if="content.t === 'header'" :value="content" />
          <Vita v-else-if="content.t === 'vita'" :value="content" />
          <Asset v-else-if="content.t === 'asset'" :value="content" />
          <Bibliography v-else-if="content.t === 'bibliography'" :value="content" />
          <Table v-else-if="content.t === 'table'" :value="content" />
          <ShortUrl v-else-if="content.t === 'shorturl'" :value="content" />
        </v-col>
      </v-row>

    </template>
  </v-container>
</template>

<script>

import Header from "~/components/book/heise/ct/Header.vue";
import Paragraph from "~/components/book/heise/ct/Paragraph.vue";
import Vita from "~/components/book/heise/ct/Vita.vue";
import Figure from "~/components/book/heise/ct/Figure.vue";
import Asset from "~/components/book/heise/ct/Asset.vue";
import Bibliography from "~/components/book/heise/ct/Bibliography.vue";
import Table from "~/components/book/heise/ct/Table.vue";
import ShortUrl from "~/components/book/heise/ct/ShortUrl.vue";

export default  {
  components: {ShortUrl, Table, Bibliography, Asset, Figure, Vita, Header, Paragraph},
  props: {
    article: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>