import i18n from "./index";

export default defineI18nConfig(async () => {
  return {
    legacy: false,
    availableLocales: i18n.locales,
    locale: i18n.defaultLocale,
    messages: {
      ...i18n.localeMappings
    }
  }
})