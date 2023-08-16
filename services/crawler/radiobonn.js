import {proxyFetch} from "~/services/crawler/common";

export const createCrawlerRadioBonn = (requestFn = proxyFetch) => {

  return {
    crawl(){
      return requestFn(`https://www.radiobonn.de/nachrichten/bonn-su.html`)
      .then(response => response.text())
      .then(content => new DOMParser().parseFromString(content, 'text/html'))
      .then(doc => {
        let result = Array.from(doc.querySelectorAll('.news-teaser__item'))
        .map(e => ({
          title: e.querySelector('.news-teaser__title').innerText,
          url: 'https://www.radiobonn.de' + e.querySelector('a.cover-link').getAttribute('href'),
          date: new Date()
        }))

        return result
      })
    },

    read(url) {
      return requestFn(url)
      .then(response => response.text())
      .then(content => new DOMParser().parseFromString(content, 'text/html'))
      .then(doc => {
        let imgSrc = 'https:' + doc.querySelector('div.card-image img').getAttribute('src')
        return {
          content: Array.from(doc.getElementsByTagName('article')[0].querySelectorAll('div>p')).map(e => e.textContent).join(' ').trim(),
          teaserImg: imgSrc
        }
      })
    }
  }
}