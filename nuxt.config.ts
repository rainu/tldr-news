// https://nuxt.com/docs/api/configuration/nuxt-config#

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/tldr-news/'
  }
} : {
  router: {
    base: '/'
  }
}

export default defineNuxtConfig({
  ...routerBase,

  ssr: false, // Disable Server Side rendering (this is an SPA only!)
  devtools: {enabled: true},
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {
      appName: process.env.npm_package_name,
      version: process.env.npm_package_version,
      builtDate: new Date(),
      revision: process.env.COMMIT_HASH || 'development',
    }
  },
  modules: [
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
  ],
  pwa: {},
  i18n: {
    vueI18n: './i18n/config.ts'
  }
})
