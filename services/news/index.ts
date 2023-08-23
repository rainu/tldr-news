import {useTheme} from "vuetify";
import {createCrawlerTagesschau} from "~/services/news/tagesschau";
import {createCrawlerHeise} from "~/services/news/heise";
import {createCrawlerGolem} from "~/services/news/golem";
import {createCrawlerFaz} from "~/services/news/faz";
import {createCrawlerFazDpa} from "~/services/news/faz-dpa";
import {createCrawlerZeitDpa} from "~/services/news/zeit";
import {createCrawlerRadioBonn} from "~/services/news/radiobonn";

export type Teaser = {
  title: string
  url: string
  date: Date
}

export type Content = {
  content: string
  teaserImg: string | null
}

export type Crawler = {
  crawl: () => Promise<Teaser[]>
  read: (url: string) => Promise<Content>
}

export type Source = {
  favIcon: () => string
  crawler: () => Crawler
}

const sources: { [id: string]: Source } = {
  tagesschau: {
    favIcon: () => 'https://tagesschau.de/resources/assets/image/favicon/favicon.svg',
    crawler: createCrawlerTagesschau
  },
  heise: {
    favIcon: () => 'https://www.heise.de/icons/ho/favicon/favicon-32x32.png',
    crawler: createCrawlerHeise
  },
  golem: {
    favIcon: () => 'https://www.golem.de/staticrl/images/logo-auge-b24.png',
    crawler: createCrawlerGolem
  },
  faz: {
    favIcon() {
      if(useTheme().current.value.dark) {
        return 'https://m.faz.net/;lm=1689594711;pass/fit/project/files/images/logos/f-white.svg'
      }
      return 'https://m.faz.net/;lm=1689594711;pass/fit/project/files/images/logos/f-black.svg'
    },
    crawler: createCrawlerFaz
  },
  'faz-dpa': {
    favIcon: () => 'https://dpa.com/icon-512x512.png',
    crawler: createCrawlerFazDpa
  },
  zeit: {
    favIcon: () => 'https://static.zeit.de/p/zeit.web/icons/favicon.svg',
    crawler: createCrawlerZeitDpa
  },
  'zeit-dpa': {
    favIcon: () => 'https://dpa.com/icon-512x512.png',
    crawler: createCrawlerZeitDpa
  },
  radiobonn: {
    favIcon: () => 'https://www.radiobonn.de/assets/images/senderlogos/radio_brs_webradio.png',
    crawler: createCrawlerRadioBonn
  }
}

export default {
  sources
}