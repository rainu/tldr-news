import i18n from '../i18n'
import { defineStore } from 'pinia'
import {useNuxtApp} from "#app";

let vuetifyInstance = null
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    cors: {
      proxy: 'https://cors-anywhere.herokuapp.com/'
    },
    rray: {
      url: null,
      username: null,
      password: null
    },
    locale: i18n.defaultLocale,
    theme: {
      dark: true,
    },
    marqueeSpeed: 50,
    openai: {
      token: '',
      news: {
        prompt: `I want you to only reply in JSON form! Do not use Markdown! The content of this JSON is the following: 
  * "points": the most important statements which reflects the summary of the article 
  * "topics": at most two biggest topics as single word in the whole article
  * "conclusion": a short conclusion of the whole article
Do answer only in german!`,
        model: 'gpt-4o-mini',
        temperature: 0.5,
      },
      books: {
        ct: {
          prompt: `Extract the main statement from the given passage. Make it short! Do response in german!`,
          model: 'gpt-4o-mini',
          temperature: 0.5,
          maxTokens: 512
        }

      }
    }
  }),
  getters: {
    isRrayInUse: (state) => {
      return !!state.rray.url
    }
  },
  actions: {
    setVuetify(vuetify) {
      vuetifyInstance = vuetify
      vuetifyInstance.global.name.value = this.theme.dark ? 'dark' : 'light'
    },
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
    }
  },
})