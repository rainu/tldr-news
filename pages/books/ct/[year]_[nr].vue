<template>
  <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

  <v-expansion-panels>
    <v-expansion-panel v-for="section of toc">
      <v-expansion-panel-title>{{section.section}}</v-expansion-panel-title>
      <v-expansion-panel-text class="content">
        <v-expansion-panels>
          <v-expansion-panel v-for="content of section.content">
            <v-expansion-panel-title @click="onArticleClick(content.page)">
              {{content.title}}
            </v-expansion-panel-title>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-footer app>
    <v-row no-gutters align="center">
      <a target="_blank" :href="pageLink">
        {{year}}/{{number}}
      </a>
      <v-spacer></v-spacer>

      <Download :year="this.year" :number="this.number" ref="download" />

      <v-tooltip :text="$t('heise.ct.download')">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" @click="onDownload">
            <v-icon>mdi-cloud-download</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip :text="$t('heise.ct.toc')">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" @click="onOverview">
            <v-icon>mdi-table-of-contents</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-row>
  </v-footer>
</template>

<script>
import {createCrawlerHeiseCt} from "~/services/books/heise/ct";
import {mapState} from "pinia";
import {useSessionsStore} from "~/store/sessions";
import Download from "~/components/book/heise/ct/Download.vue";

export default {
  components: {Download},
  data(){
    return {
      loading: true,
      toc: [],
    }
  },
  computed: {
    ...mapState(useSessionsStore, ['heise']),
    fetcher(){
      return createCrawlerHeiseCt(this.heise.cookies)
    },
    year(){
      return this.$route.params.year
    },
    number(){
      return this.$route.params.nr
    },
    pageLink(){
      return `https://www.heise.de/select/ct/${this.year}/${this.number}`
    }
  },
  methods: {
    onArticleClick(page) {
      navigateTo({
        path: `/books/ct/${this.year}_${this.number}_${page}`
      })
    },
    onOverview(){
      navigateTo({
        path: `/books/ct`
      })
    },
    onDownload(){
      this.$refs.download.toc = this.toc //dont download twice
      this.$refs.download.onDownload()
    }
  },
  mounted() {
    createCrawlerHeiseCt().getTableOfContent(this.year, this.number).then(toc => {
      this.toc = toc
      this.loading = false
    })
  }
}
</script>

<style>
.content .v-expansion-panel-text__wrapper {
  padding: 0;
}
</style>