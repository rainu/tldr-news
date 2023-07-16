<template>
  <v-card>
    <template v-slot:title>
      <v-toolbar :title="title" class="clickable" @click="read">
        <v-btn icon>
          <a target="_blank" :href="url">
            <v-icon>mdi-link</v-icon>
          </a>
        </v-btn>
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
        {{content.content}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {format} from "date-fns";

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
    }
  }
}
</script>

<style>
.clickable {
  cursor:pointer;
}
</style>