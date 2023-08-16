<template>
  <GeneralSecret v-model="token" :label="$t('settings.openai.token')"></GeneralSecret>
  <v-textarea v-model="prompt" :label="$t('settings.openai.prompt')" />
  <v-select v-model="model" :label="$t('settings.openai.model')" :items="availableModels" />

  <div class="text-caption">{{ $t('settings.openai.temperature.label') }}</div>
  <v-slider
      v-model="temperature"
      :min="0" :max="2" :step="0.1"
      :ticks="tempTickLabels" show-ticks="always"
      prepend-icon="mdi-thermometer-low" append-icon="mdi-thermometer-high"></v-slider>
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
      prompt: '',
      model: '',
      temperature: 0,
      availableModels: []
    }
  },
  computed: {
    ...mapWritableState(useSettingsStore, ['openai']),
    tempTickLabels(){
      return {
        0: this.$t('settings.openai.temperature.min'),
        1: this.temperature,
        2: this.$t('settings.openai.temperature.max'),
      }
    }
  },
  watch: {
    token(){
      this.openai.token = this.token
    },
    prompt(){
      this.openai.prompt = this.prompt
    },
    model(){
      this.openai.model = this.model
    },
    temperature(){
      this.openai.temperature = this.temperature
    }
  },
  mounted() {
    this.token = this.openai.token
    this.prompt = this.openai.prompt
    this.model = this.openai.model
    this.temperature = this.openai.temperature

    openaiClient().models().then(models => {
      this.availableModels = models.map(m => m.id).sort()
    })
  }
}
</script>

<style scoped>

</style>
