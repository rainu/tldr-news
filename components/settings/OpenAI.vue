<template>
  <GeneralSecret v-model="token" :label="$t('settings.openai.token')"></GeneralSecret>
  <v-card>
    <v-card-title>{{$t('common.news')}}</v-card-title>
    <v-card-text>
      <v-textarea v-model="news.prompt" :label="$t('settings.openai.prompt')" />
      <v-select v-model="news.model" :label="$t('settings.openai.model')" :items="availableModels" />

      <div class="text-caption">{{ $t('settings.openai.temperature.label') }}</div>
      <v-slider
          v-model="news.temperature"
          :min="0" :max="2" :step="0.1"
          :ticks="newsTempTickLabels" show-ticks="always"
          prepend-icon="mdi-thermometer-low" append-icon="mdi-thermometer-high"></v-slider>
    </v-card-text>
  </v-card>
  <v-card>
    <v-card-title>{{ $t('common.books') }} / {{ $t('heise.ct.title') }}</v-card-title>
    <v-card-text>
      <v-textarea v-model="books.ct.prompt" :label="$t('settings.openai.prompt')" />
      <v-select v-model="books.ct.model" :label="$t('settings.openai.model')" :items="availableModels" />

      <div class="text-caption">{{ $t('settings.openai.temperature.label') }}</div>
      <v-slider
          v-model="books.ct.temperature"
          :min="0" :max="2" :step="0.1"
          :ticks="ctTempTickLabels" show-ticks="always"
          prepend-icon="mdi-thermometer-low" append-icon="mdi-thermometer-high"></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
import {useSettingsStore} from '~/store/settings'
import { mapWritableState } from 'pinia';
import {openaiClient} from "~/services/openai";

export default {
  name: "SettingsOpenAI",
  data(){
    return {
      token: '',
      news: {
        prompt: '',
        model: '',
        temperature: 0,
      },
      books: {
        ct: {
          prompt: '',
          model: '',
          temperature: 0,
        },
      },
      availableModels: []
    }
  },
  computed: {
    ...mapWritableState(useSettingsStore, ['openai']),
    newsTempTickLabels(){
      return {
        0: this.$t('settings.openai.temperature.min'),
        1: this.news.temperature,
        2: this.$t('settings.openai.temperature.max'),
      }
    },
    ctTempTickLabels(){
      return {
        0: this.$t('settings.openai.temperature.min'),
        1: this.books.ct.temperature,
        2: this.$t('settings.openai.temperature.max'),
      }
    }
  },
  watch: {
    token(){
      this.openai.token = this.token
    },
    'news.prompt'(){
      this.openai.news.prompt = this.news.prompt
    },
    'news.model'(){
      this.openai.news.model = this.news.model
    },
    'news.temperature'(){
      this.openai.news.temperature = this.news.temperature
    },
    'books.ct.prompt'(){
      this.openai.books.ct.prompt = this.books.ct.prompt
    },
    'books.ct.model'(){
      this.openai.books.ct.model = this.books.ct.model
    },
    'books.ct.temperature'(){
      this.openai.books.ct.temperature = this.books.ct.temperature
    }
  },
  mounted() {
    this.token = this.openai.token
    this.news.prompt = this.openai.news.prompt
    this.news.model = this.openai.news.model
    this.news.temperature = this.openai.news.temperature
    this.books.ct.prompt = this.openai.books.ct.prompt
    this.books.ct.model = this.openai.books.ct.model
    this.books.ct.temperature = this.openai.books.ct.temperature

    openaiClient().models().then(models => {
      this.availableModels = models.map(m => m.id).sort()
    })
  }
}
</script>

<style scoped>

</style>
