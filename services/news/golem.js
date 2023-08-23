import {parse} from 'date-fns'
import {proxyFetch} from "./common";

export const createCrawlerGolem = (requestFn = proxyFetch) => {

  return {
    crawl(){
      return requestFn(`https://www.golem.de/ticker/`, {
        headers: {
          "User-Agent": "curl/8.2.1",
          "Cookie": "golem_consent20=simple|220101" //give consent
        }
      })
        .then(response => response.text())
        .then(content => new DOMParser().parseFromString(content, 'text/html'))
        .then(doc => {
          let result = Array.from(doc.querySelectorAll('ol.list-tickers li:not([class])'))
            .filter(e => !e.getElementsByTagName('h3')[0].classList.contains('golemplus'))
            .map(e => ({
              title: e.querySelector('a').text.replace("  ", " "),
              url: e.querySelector('a').getAttribute('href'),
              date: parse(e.closest('ol').id.split('-')[1] + " " + e.querySelector('p.meta').innerText, 'yyyyMMdd HH:mm', new Date())
            }))

          return result
        })
    },

    read(url) {
      return requestFn(url, {
        headers: {
          "User-Agent": "curl/8.2.1",
          "Cookie": "golem_consent20=simple|220101" //give consent
        }
      })
      .then(response => response.text())
      .then(content => new DOMParser().parseFromString(content, 'text/html'))
      .then(doc => {
        let imgSrc = doc.querySelector('article header img').getAttribute('src')
        return {
          content: Array.from(doc.querySelectorAll('article section p')).map(e => e.textContent).join(' ').trim(),
          teaserImg: imgSrc
        }
      })
    }
  }
}