<template>
  <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

  <v-expansion-panels v-show="showToc">
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

  <Article v-if="currentArticle" v-show="!showToc" :article="currentArticle"></Article>
  <v-progress-linear v-else-if="!showToc" indeterminate color="primary"></v-progress-linear>

  <v-footer app>
    <v-row no-gutters align="center">
      <a target="_blank" :href="pageLink">
        {{year}}/{{number}}

        <span v-show="!!currentPage">
          -
          {{ $t('heise.ct.page') }}
          {{ currentPage }}
        </span>
      </a>
      <v-spacer></v-spacer>

      <Download :year="this.year" :number="this.number" :toc="this.toc" ref="download" />

      <v-menu open-on-click>
        <template v-slot:activator="{props}">
          <v-btn icon v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="onDownload">
            <v-list-item-title>{{ $t('heise.ct.download') }}</v-list-item-title>
            <template v-slot:append>
              <v-icon>mdi-cloud-download</v-icon>
            </template>
          </v-list-item>
          <v-list-item @click="showToc = true">
            <v-list-item-title>{{ $t('heise.ct.toc') }}</v-list-item-title>
            <template v-slot:append>
              <v-icon>mdi-table-of-contents</v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
  </v-footer>
</template>

<script>
import {createCrawlerHeiseCt} from "~/services/books/heise/ct";
import {mapState} from "pinia";
import {useSessionsStore} from "~/store/sessions";
import Article from "~/components/book/heise/ct/Article.vue";
import Download from "~/components/book/heise/ct/Download.vue";

export default {
  components: {Download, Article},
  data(){
    return {
      showToc: true,
      loading: true,
      toc: [],
      articles: {},
      currentPage: null,
      currentArticle: null,
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
      if(this.currentPage) {
        return `https://www.heise.de/select/ct/${this.year}/${this.number}/seite-${this.currentPage}`
      }
      return `https://www.heise.de/select/ct/${this.year}/${this.number}`
    }
  },
  methods: {
    onArticleClick(page) {
      this.currentPage = page
      this.currentArticle = null
      this.showToc = false

      if(this.articles[page]) {
        //already loaded
        this.currentArticle = this.articles[page]
        return
      }

      this.fetcher.getArticle(this.year, this.number, page)
        .then(content => {
          this.articles[page] = content
          this.currentArticle = content
        })
    },
    onDownload(){
      this.$refs.download.onDownload()
    }
  },
  mounted() {
    createCrawlerHeiseCt().getTableOfContents(this.year, this.number).then(toc => {
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