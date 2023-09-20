<template>
  <v-dialog v-model="showProgress" persistent>
    <v-card>
      <v-card-title>{{ $t('heise.ct.download') }}</v-card-title>
      <v-card-subtitle>{{year}}/{{number}}</v-card-subtitle>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-progress-linear v-model="total.done" :max="total.total" height="25" bg-color="primary" color="secondary">
              <strong>{{ Math.ceil(total.done * 100 / total.total) }} %</strong>
            </v-progress-linear>
          </v-col>
          <v-col cols="12">
            <v-progress-linear v-model="section.done" :max="toc.length" height="25" bg-color="primary" color="secondary">
              <strong>{{ $t('heise.ct.section') }} {{ section.done }} / {{ toc.length }}</strong>
            </v-progress-linear>
          </v-col>
          <v-col cols="12">
            <v-progress-linear v-model="page.done" :max="page.total" height="25" bg-color="primary" color="secondary">
              <strong>{{ $t('heise.ct.page') }} {{ page.done }} / {{ page.total }}</strong>
            </v-progress-linear>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-show="!inProgress">
        <v-btn block @click="showProgress = false" color="primary">{{$t('about.close')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div @click="onDownload">
    <slot></slot>
  </div>
</template>

<script>

import {mapState} from "pinia";
import {useSessionsStore} from "~/store/sessions";
import {createCrawlerHeiseCt} from "~/services/books/heise/ct";

export default {
  props: {
    year: {
      required: true
    },
    number: {
      required: true
    }
  },
  data(){
    return {
      showProgress: false,
      inProgress: false,
      total: {
        done: 0,
        total: 0
      },
      section: {
        done: 0,
      },
      page: {
        done: 0,
        total: 0,
      },
      toc: null
    }
  },
  computed: {
    ...mapState(useSessionsStore, ['heise']),
    fetcher() {
      return createCrawlerHeiseCt(this.heise.cookies)
    },
  },
  methods: {
    async onDownload() {
      this.total.done = 0
      this.total.total = 0
      this.section.done = 0
      this.inProgress = true
      this.showProgress = true

      if(!this.toc) {
        this.toc = await this.fetcher.getTableOfContent(this.year, this.number)
      }

      for (let section of this.toc) {
        this.total.total += section.content.length
      }

      for (let section of this.toc) {
        this.page.done = 0
        this.page.total = section.content.length

        await Promise.all(section.content.map(
          c => this.fetcher.getArticle(this.year, this.number, c.page)
          .then(() => {
            this.total.done++
            this.page.done++
          })
        ))
        this.section.done++
      }

      this.inProgress = false
    }
  },
}

</script>

<style scoped>

</style>