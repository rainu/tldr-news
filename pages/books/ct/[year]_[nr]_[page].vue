<template>
  <Article v-if="article" :article="article"></Article>
  <v-progress-linear v-else indeterminate color="primary"></v-progress-linear>

  <v-footer app>
    <v-row no-gutters align="center">
      <a target="_blank" :href="articleLink">
        {{year}}/{{number}}
        -
        {{ $t('heise.ct.page') }}
        {{ page }}
      </a>
      <v-spacer></v-spacer>

      <v-tooltip :text="$t('heise.ct.toc')">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" @click="onToc">
            <v-icon>mdi-table-of-contents</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-row>
  </v-footer>
</template>

<script>
import {mapState} from "pinia";
import {useSessionsStore} from "~/store/sessions";
import {createCrawlerHeiseCt} from "~/services/books/heise/ct";
import Article from "~/components/book/heise/ct/Article.vue";
import Download from "~/components/book/heise/ct/Download.vue";

export default {
  components: {Download, Article},
  data(){
    return {
      article: null
    }
  },
  computed: {
    ...mapState(useSessionsStore, ['heise']),
    fetcher() {
      return createCrawlerHeiseCt(this.heise.cookies)
    },
    year() {
      return this.$route.params.year
    },
    number() {
      return this.$route.params.nr
    },
    page() {
      return this.$route.params.page
    },
    articleLink(){
      return `https://www.heise.de/select/ct/${this.year}/${this.number}/seite-${this.page}`
    }
  },
  methods: {
    onDownload(){
      this.$refs.download.onDownload()
    },
    onToc(){
      navigateTo({
        path: `/books/ct/${this.year}_${this.number}`
      })
    }
  },
  mounted() {
    this.fetcher.getArticle(this.year, this.number, this.page)
      .then(content => {
        this.article = content
      })
  }
}
</script>

<style scoped>

</style>