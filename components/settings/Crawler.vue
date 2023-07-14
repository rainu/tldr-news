<template>
  <v-combobox
    v-model="value"
    :label="$t('settings.crawler.cors-proxy')"
    :items="predefinedItems"
    @change="onChange">
  </v-combobox>
</template>

<script>
import {useSettingsStore} from '~/store/settings'
import {mapWritableState} from "pinia";

export default {
  name: "SettingsCrawler",
  data(){
    return {
      value: null,
      predefinedItems: [
        'https://cors-anywhere.herokuapp.com/',
      ]
    }
  },
  computed: {
    ...mapWritableState(useSettingsStore, ['cors'])
  },
  methods: {
    onChange(){
      this.cors.proxy = this.value
    }
  },
  mounted() {
    this.value = this.cors.proxy

    let i = this.predefinedItems.findIndex(i => i === this.value)
    if(i < 0) {
      this.predefinedItems.push(this.value)
    }
  }
}
</script>

<style scoped>

</style>
