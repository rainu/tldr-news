import {parse} from 'date-fns'
import {proxyFetch} from "~/services/news/common";
export const createCrawlerFaz = (requestFn = proxyFetch) => {

  const crawlPage = (page) => {
    return requestFn(`https://www.faz.net/faz-live-p${page}`)
      .then(response => response.text())
      .then(content => new DOMParser().parseFromString(content, 'text/html'))
      .then(doc => {
        let result = Array.from(doc.querySelectorAll('div.ticker-news-text'))
          .filter(e => !e.querySelector('img[alt="FAZ+"]'))
          .filter(e => !e.querySelector('img[alt="Agenturmeldung"]'))
          .map(e => ({
            title: e.querySelector('.ticker-news-super').innerText.replace(':', '').trim() + ": " + e.querySelector('.ticker-news-title').innerText.trim(),
            url: e.querySelector('.ticker-news-title a').getAttribute('href'),
            date: parse(e.getElementsByTagName('time')[0].innerText.replace(' Uhr', ''), 'dd.MM.yyyy HH:mm', new Date())
          }))

        return result
      })
  }

  return {
    crawl(){
      const now = new Date()
      return Promise.all([
        crawlPage(1),
        crawlPage(2),
        crawlPage(3),
        crawlPage(4),
        crawlPage(5),
        crawlPage(6),
        crawlPage(7),
        crawlPage(8),
        crawlPage(9),
        crawlPage(10),
        crawlPage(11),
        crawlPage(12),
        crawlPage(13),
        crawlPage(14),
        crawlPage(15),
      ]).then(results => [
          ...results[0],
          ...results[1],
          ...results[2],
          ...results[3],
          ...results[4],
          ...results[5],
          ...results[6],
          ...results[7],
          ...results[8],
          ...results[9],
          ...results[10],
          ...results[11],
          ...results[12],
          ...results[13],
          ...results[14],
      ])
    },

    read(url) {
      return requestFn(url)
        .then(response => response.text())
        .then(content => new DOMParser().parseFromString(content, 'text/html'))
        .then(doc => {
          return {
            content: Array.from(doc.querySelectorAll('.atc-TextParagraph')).map(e => e.textContent).join(' ').trim(),
            teaserImg: doc.querySelector('.atc-ImageContainer img.atc-Image').getAttribute('data-retina-src')
          }
        })
    }
  }
}