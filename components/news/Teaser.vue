<template>
  <v-card dense>
    <template v-slot:title>
      <v-toolbar class="clickable" @click="read">
        <v-toolbar-title>
          <Vue3Marquee :duration="marqueeDuration">
            <span class="pr-2">{{ title }}</span>
          </Vue3Marquee>
        </v-toolbar-title>
        <v-toolbar-items>
          <v-btn icon>
            <a target="_blank" :href="url">
              <v-icon>mdi-link</v-icon>
            </a>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </template>
    <template v-slot:subtitle>
      <span>{{ format(date, $t('common.datetime.format.time')) }}</span>
      <span>&ensp;Uhr</span>
    </template>

    <v-card-text v-if="content">
      <div v-show="show">
        <v-img :src="content.teaserImg">
          <template v-slot:placeholder>
            <v-progress-circular indeterminate color="primary" />
          </template>
        </v-img>

        <v-progress-linear indeterminate color="primary" v-if="!summary" />

        <v-row>
          <v-col cols="6">{{$t('common.estimation.read')}} {{estimatedReadDuration}}</v-col>
          <v-col cols="6" class="text-right">{{$t('common.wordcount')}} {{wordCount}}</v-col>
        </v-row>

        <div v-if="summary">
          <v-chip-group v-if="summary.topics">
            <v-chip v-for="topic of summary.topics">
              {{topic}}
            </v-chip>
          </v-chip-group>
          <v-list v-if="summary.points">
            <v-list-item v-for="point of summary.points">
              <template v-slot:prepend>
                <v-icon>mdi-star</v-icon>
              </template>
              <span>{{point}}</span>
            </v-list-item>
          </v-list>
          <p v-if="summary.conclusion">{{summary.conclusion}}</p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {format} from "date-fns";
import {useSettingsStore} from '~/store/settings'
import { mapState } from 'pinia';
import {openaiClient} from "~/services/openai";
import * as dateFns from 'date-fns'

export default {
  name: 'NewsTeaser',
  props: {
    title: {
      required: true,
      type: String
    },
    date: {
      required: true,
      type: Date
    },
    url: {
      required: true,
      type: String
    },
    'crawler': {
      required: true,
      type: Object
    }
  },
  data(){
    return {
      content: null,
      show: false,
      summary: null,
    }
  },
  computed: {
    ...mapState(useSettingsStore, ['marqueeSpeed']),
    marqueeDuration() {
      if(this.marqueeSpeed === 0) return 0
      if(this.marqueeSpeed === 100) return 0.5

      return 30 * (100 - this.marqueeSpeed) / 100
    },
    wordCount(){
      return this.content.content.match(/\b\w+\b/g).length
    },
    estimatedReadDuration(){
      let seconds = this.wordCount / (200 / 60)
      return dateFns.format(new Date(0).setSeconds(seconds), 'mm:ss')
    }
  },
  methods: {
    format,
    read() {
      this.show = !this.show

      //only load once
      if(this.content) return

      this.crawler.read(this.url)
        .then(content => {
          this.content = content
        })
        .then(() => openaiClient().summary(this.content.content))
        .then(summary => {
          try{
            this.summary = JSON.parse(summary)
          } catch {
            this.summary = {
              conclusion: summary
            }
          }
        })
    },
  }
}
</script>

<style>
.clickable {
  cursor:pointer;
}
</style>