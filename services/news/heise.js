import {proxyFetch} from "../common";

export const createCrawlerHeise = (requestFn = proxyFetch) => {

  return {
    crawl(){
      return requestFn(`https://www.heise.de/newsticker/`)
        .then(response => response.text())
        .then(content => new DOMParser().parseFromString(content, 'text/html'))
        .then(doc => {
          let result = Array.from(doc.querySelectorAll('section.archive__day article.a-article-teaser'))
            .filter(e => !e.getElementsByTagName("a")[0].getAttribute('href').endsWith('.teaser'))
            .map(e => ({
              title: e.querySelector('.a-article-teaser__title-text').innerText,
              url: 'https://www.heise.de' + e.getElementsByTagName('a')[0].getAttribute('href'),
              date: new Date(e.getElementsByTagName('time')[0].getAttribute('datetime'))
            }))

          return result
        })
    },

    read(url) {
      return requestFn(url)
      .then(response => response.text())
      .then(content => new DOMParser().parseFromString(content, 'text/html'))
      .then(doc => {
        let img = doc.querySelector('a-img')
        let legacyImg = doc.querySelector('img.legacy-img')
        return {
          content: Array.from(doc.getElementsByTagName('article')[0].querySelectorAll('p:not([class])')).filter(e => !e.hasAttributes()).map(e => e.textContent).join(' ').trim(),
          teaserImg: legacyImg ? legacyImg.getAttribute('src') : 'https://www.heise.de' + img.getAttribute('src')
        }
      })
    }
  }
}