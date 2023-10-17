<template>
  <v-container v-if="article" fluid>
    <span id="topOfPage" />
    <div v-for="(content, i) of article.Content">
      <template v-if="content.t === 'section'">
        <v-row v-if="content.Title" :id="`section-${i}`">
          <v-col>
            <h3>{{content.Title}}</h3>
          </v-col>
        </v-row>
        <v-row v-for="sectionContent of content.Content">
          <v-col>
            <Paragraph v-if="sectionContent.t === 'paragraph'" :value="sectionContent" />
            <Codeblock v-else-if="sectionContent.t === 'codeblock'" :value="sectionContent" />
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

    </div>
  </v-container>
  <v-progress-linear v-else indeterminate color="primary"></v-progress-linear>

  <v-footer app>
    <v-row no-gutters align="center">
      <v-progress-linear indeterminate v-show="summarizeInProgress" color="primary"></v-progress-linear>

      <a target="_blank" :href="articleLink">
        {{year}}/{{number}}
        -
        {{ $t('heise.ct.page') }}
        {{ page }}
      </a>
      <v-spacer></v-spacer>

      <v-menu open-on-click>
        <template v-slot:activator="{props}">
          <v-btn icon v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="scrollToTop()">
            <v-list-item-title>{{ $t('heise.ct.top') }}</v-list-item-title>
            <template v-slot:append>
              <v-icon>mdi-navigation-variant</v-icon>
            </template>
          </v-list-item>
          <template v-for="(content, i) of article.Content">
            <v-list-item v-if="content.t === 'section' && !!content.Title" @click="scrollTo(i)">
              <v-list-item-title>{{content.Title}}</v-list-item-title>
              <template v-slot:append>
                <v-icon>mdi-navigation-variant</v-icon>
              </template>
            </v-list-item>
          </template>
        </v-list>

        <v-list>
          <v-list-item @click="onSummarize">
            <v-list-item-title>{{ $t('heise.ct.summarize') }}</v-list-item-title>
            <template v-slot:append>
              <v-icon>mdi-text-short</v-icon>
            </template>
          </v-list-item>
          <v-list-item @click="onToc">
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
import {mapState} from "pinia";
import {useSessionsStore} from "~/store/sessions";
import {createCrawlerHeiseCt} from "~/services/books/heise/ct";
import Download from "~/components/book/heise/ct/Download.vue";
import Figure from "~/components/book/heise/ct/Figure.vue";
import Bibliography from "~/components/book/heise/ct/Bibliography.vue";
import Paragraph from "~/components/book/heise/ct/Paragraph.vue";
import Header from "~/components/book/heise/ct/Header.vue";
import Table from "~/components/book/heise/ct/Table.vue";
import Asset from "~/components/book/heise/ct/Asset.vue";
import ShortUrl from "~/components/book/heise/ct/ShortUrl.vue";
import Vita from "~/components/book/heise/ct/Vita.vue";
import Codeblock from "~/components/book/heise/ct/Codeblock.vue";
import {openaiClient} from "~/services/openai";

export default {
  components: {
    Codeblock,
    Vita,
    ShortUrl,
    Asset,
    Table,
    Header,
    Paragraph,
    Bibliography,
    Figure,
    Download,
  },
  data(){
    return {
      article: null,
      summarizeInProgress: false
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
    },
    scrollToTop() {
      document.getElementById(`topOfPage`).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      })
    },
    scrollTo(i) {
      document.getElementById(`section-${i}`).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      })
    },
    onSummarize(){
      this.summarizeInProgress = true

      let summarizableParagraphs = this.article.Content
        .filter(e => e.t === 'section')
        .map(s => s.Content)
        .flat()
        .filter(c => c.t === 'paragraph')
        .filter(p => !p.Summary) //only ones which have no summary yet

      //summarize all paragraphs
      Promise.all(summarizableParagraphs.map(p => openaiClient().mainStatementOf(p.Content).then(summary => {
        // extend the object itself with the summary
        p.Summary = summary
      }))).finally(() => {
        this.summarizeInProgress = false
      })
    }
  },
  mounted() {
    this.fetcher.getArticle(this.year, this.number, this.page)
      .then(content => {
        console.log(content)
        this.article = content
      })
  }
}
</script>

<style scoped>

</style>