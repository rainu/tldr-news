<template>
  <v-radio-group inline v-model="type">
    <v-radio :label="$t('settings.crawler.cors.proxy')" value="cors"></v-radio>
    <v-radio :label="$t('settings.crawler.r-ray.proxy')" value="r-ray"></v-radio>
  </v-radio-group>
  <v-combobox
    v-if="type === 'cors'"
    v-model="corsValue.url"
    :label="$t('settings.crawler.cors-proxy')"
    :items="predefinedCorsItems"
    @change="onCorsChange">
  </v-combobox>
  <template v-if="type === 'r-ray'">
    <v-row dense>
      <v-col cols="12">
        <v-text-field v-model="rrayValue.url" :label="$t('settings.crawler.r-ray.url')" @change="onRrayChange" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="6">
        <v-text-field v-model="rrayValue.username" :label="$t('settings.crawler.r-ray.username')" @change="onRrayChange" />
      </v-col>
      <v-col cols="6">
        <GeneralSecret v-model="rrayValue.password" :label="$t('settings.crawler.r-ray.password')" @change="onRrayChange" />
      </v-col>
    </v-row>
  </template>
</template>

<script>
import {useSettingsStore} from '~/store/settings'
import {mapWritableState} from "pinia";

export default {
  name: "SettingsCrawler",
  data(){
    return {
      corsValue: {
        url: null
      },
      rrayValue: {
        url: null,
        username: null,
        password: null,
      },
      type: null,
      predefinedCorsItems: [
        'https://cors-anywhere.herokuapp.com/',
      ]
    }
  },
  computed: {
    ...mapWritableState(useSettingsStore, ['cors', 'rray'])
  },
  methods: {
    onCorsChange(){
      this.cors.proxy = this.corsValue.url

      this.rray.url = null
      this.rrayValue.url = null
    },
    onRrayChange(){
      this.rray.url = this.rrayValue.url
      this.rray.username = this.rrayValue.username
      this.rray.password = this.rrayValue.password

      this.cors.proxy = null
      this.corsValue.url = null
    }
  },
  mounted() {
    this.type = !!this.rray && !!this.rray.url ? 'r-ray' : 'cors'

    this.rrayValue.url = this.rray.url
    this.rrayValue.username = this.rray.username
    this.rrayValue.password = this.rray.password

    this.corsValue.url = this.cors.proxy

    let i = this.predefinedCorsItems.findIndex(i => i === this.corsValue.url)
    if(i < 0) {
      this.predefinedCorsItems.push(this.corsValue.url)
    }
  }
}
</script>

<style scoped>

</style>
