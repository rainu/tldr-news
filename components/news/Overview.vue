<template>
  <v-container>
    <div class="text-center" v-show="!loaded">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <v-row v-for="(section, i) of entries" :key="section[0].date.getDate()" dense>
      <v-col cols="12">
        <v-card>
          <v-card-title @click="collapseSection(i)" class="clickable">
            <v-toolbar :title="format(section[0].date, $t('common.datetime.format.date'))">
              <v-btn icon>
                <v-icon v-if="sectionShow[i]">mdi-arrow-collapse</v-icon>
                <v-icon v-else>mdi-arrow-expand</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card-title>
          <v-card-text v-show="sectionShow[i]">
            <v-row v-for="entry of section" :key="entry.url" dense>
              <v-col cols="12">
                <Teaser :title="entry.title" :date="entry.date" :url="entry.url" :crawler="crawler" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Teaser from "./Teaser.vue"
import {format} from "date-fns";

export default {
  name: 'NewsOverview',
  components: {Teaser},
  props: {
    'crawler': {
      required: true,
      type: Object
    }
  },
  data(){
    return {
      loaded: false,
      sectionShow: {},
      entries: []
    }
  },
  methods: {
    format,
    collapseSection(i) {
      this.sectionShow[i] = !this.sectionShow[i]
    }
  },
  mounted() {
    this.crawler.crawl()
    .then(entries => {
      let curDate = new Date().getDate()

      //split into date chunks
      let chunk = []
      for (let entry of entries) {
        if(entry.date.getDate() !== curDate) {
          this.entries.push(chunk)
          chunk = []
          curDate = entry.date.getDate()
        }
        chunk.push(entry)
      }
      this.sectionShow[0] = true
      this.entries.push(chunk)
      this.loaded = true
    })
  }
}
</script>

<style>
.clickable {
  cursor:pointer;
}
</style>