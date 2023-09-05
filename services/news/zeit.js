import {proxyFetch} from "../common";

const baseCrawlerZeit = (requestFn = proxyFetch, teaserFilter) => {

  return {
    crawl(){
      return requestFn(`https://www.zeit.de/news/index`, {
        headers: {
          "User-Agent": "curl/8.2.1" //it is enough to set the user agent
        }
      })
      .then(response => response.text())
      .then(content => new DOMParser().parseFromString(content, 'text/html'))
      .then(doc => {
        let result = Array.from(doc.querySelectorAll('article.zon-teaser-news'))
        .filter(e => !e.hasAttribute('data-zplus'))
        .filter(e => teaserFilter(e))
        .map(e => ({
          title: e.getElementsByTagName('a')[0].getAttribute('title'),
          url: e.getElementsByTagName('a')[0].getAttribute('href'),
          date: new Date(e.getElementsByTagName('time')[0].getAttribute('datetime'))
        }))

        return result
      })
    },

    read(url) {
      return requestFn(url, {
        headers: {
          "User-Agent": "curl/8.2.1" //it is enough to set the user agent
        }
      })
      .then(response => response.text())
      .then(content => new DOMParser().parseFromString(content, 'text/html'))
      .then(doc => ({
        content: Array.from(doc.querySelectorAll('.article-body .paragraph.article__item')).map(e => e.textContent).join(' ').trim(),
        teaserImg: doc.querySelector('div[data-ct-row="headerimage"] picture img').getAttribute('src')
      }))
    }
  }
}

export const createCrawlerZeit = (requestFn = proxyFetch) => {
  return baseCrawlerZeit(requestFn, e => !e.querySelector('.zon-teaser-news__byline').innerText.startsWith('dpa'))
}

export const createCrawlerZeitDpa = (requestFn = proxyFetch) => {
  return baseCrawlerZeit(requestFn, e => e.querySelector('.zon-teaser-news__byline').innerText.startsWith('dpa'))
}