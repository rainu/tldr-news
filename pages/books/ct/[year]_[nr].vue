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
            <v-expansion-panel-text>
              <Article v-if="articles[content.page]" :article="articles[content.page]"></Article>
              <v-progress-linear v-else indeterminate color="primary"></v-progress-linear>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import {createCrawlerHeiseCt} from "~/services/books/heise/ct";
import {mapState} from "pinia";
import {useSessionsStore} from "~/store/sessions";
import Article from "~/components/book/heise/ct/Article.vue";

export default {
  components: {Article},
  data(){
    return {
      loading: true,
      toc: [],
      articles: {}
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
  },
  methods: {
    onArticleClick(page) {
      this.fetcher.getArticle(this.year, this.number, page)
        .then(content => {
          this.articles[page] = content
        })
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