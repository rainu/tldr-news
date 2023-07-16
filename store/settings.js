import i18n from '../i18n'
import { useTheme } from 'vuetify'
import { defineStore } from 'pinia'
import {useNuxtApp} from "#app";

let vuetifyInstance = null
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    cors: {
      proxy: 'https://cors-anywhere.herokuapp.com/'
    },
    locale: i18n.defaultLocale,
    theme: {
      dark: true,
    },
  }),
  actions: {
    applyDarkTheme(dark){
      if(vuetifyInstance) {
        vuetifyInstance.global.name.value = dark ? 'dark' : 'light'
      }

      this.theme.dark = dark
    },
    applyLocale(locale) {
      //apply to i18n
      useNuxtApp().$i18n.setLocale(locale)

      //save into store
      this.locale = locale
    }
  },
  persist: {
    storage: persistedState.localStorage,
    afterRestore(ctx) {
      useNuxtApp().$i18n.setLocale(ctx.store.$state.locale)
      vuetifyInstance = useTheme()

      vuetifyInstance.global.name.value = ctx.store.$state.theme.dark ? 'dark' : 'light'
    }
  },
})