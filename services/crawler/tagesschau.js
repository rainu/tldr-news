import {addDays, format} from 'date-fns'
export const createCrawlerTagesschau = (requestFn = $fetch) => {

  const crawlDate = (date) => {
    return requestFn(`https://www.tagesschau.de/archiv/allemeldungen?datum=${format(date, 'yyyy-MM-dd')}`)
      .then(response => response.text())
      .then(content => new DOMParser().parseFromString(content, 'text/html'))
      .then(doc => {
        let result = Array.from(doc.querySelectorAll('li.teaser-mikro')).map(e => ({
          title: e.getElementsByTagName('h3')[0].innerText.trim(),
          url: 'https://www.tagesschau.de' + e.getElementsByTagName('a')[0].getAttribute('href'),
          date: new Date(date.getFullYear(), date.getMonth(), date.getDate(),
              parseInt(e.querySelector('span.teaser-mikro__date').innerText.split(':')[0]),
              parseInt(e.querySelector('span.teaser-mikro__date').innerText.split(':')[1])
          )
        }))

        return result
      })
  }

  return {
    crawl(){
      const now = new Date()
      return Promise.all([
          crawlDate(addDays(now, 0)),
          crawlDate(addDays(now, -1)),
          crawlDate(addDays(now, -2)),
          crawlDate(addDays(now, -3)),
          crawlDate(addDays(now, -4)),
          crawlDate(addDays(now, -5)),
          crawlDate(addDays(now, -6)),
      ]).then(results => [
          ...results[0],
          ...results[1],
          ...results[2],
          ...results[3],
          ...results[4],
          ...results[5],
          ...results[6],
      ])
    },

    read(url) {
      return requestFn(url)
        .then(response => response.text())
        .then(content => new DOMParser().parseFromString(content, 'text/html'))
        .then(doc => {
          return {
            content: Array.from(doc.getElementsByTagName('article')[0].querySelectorAll('p.textabsatz')).map(e => e.textContent).join(' ').trim(),
            teaserImg: doc.querySelector('img.ts-image').getAttribute('src')
          }
        })
    }
  }
}