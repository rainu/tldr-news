import de from './de.json'
import en from './en.json'

let localeMappings = {
  'de': de,
  'en': en
}

export default {
  locales: Object.keys(localeMappings),
  localeMappings,
  defaultLocale: 'de'
}
