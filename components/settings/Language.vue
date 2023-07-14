<template>
  <v-select
    :items="localeOptions"
    v-model="locale"
    :label="$t('settings.language.title')"
    @update:modelValue="onLanguageChange"
  ></v-select>
</template>

<script>
import {useSettingsStore} from '~/store/settings'
import {mapActions} from 'pinia';
import i18n from '~/i18n'

export default {
  name: "SettingsLanguage",
  data(){
    return {
      locale: null
    }
  },
  computed: {
    localeOptions(){
      return i18n.locales.map(l => ({value: l, title: i18n.localeMappings[l].meta.language.code}))
    },
  },
  methods: {
    ...mapActions(useSettingsStore, ['applyLocale']),
    onLanguageChange(lang){
      this.applyLocale(lang)
    },
  },
  mounted() {
    let locale = useSettingsStore().locale
    this.locale = this.localeOptions.find(l => l.value === locale)
  }
}
</script>

<style scoped>

</style>
