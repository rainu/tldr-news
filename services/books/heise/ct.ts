import {rrayClient} from "~/services/common"
import setCookie from 'set-cookie-parser'
import {Article, parseArticle} from "~/services/books/heise/ct-article-parser";

export const baseUrl = 'https://www.heise.de'

export const loginHeise = async (username: string, password: string) => {
  const formData = new FormData();
  formData.set('forward', `${baseUrl}/`)
  formData.set('username', username)
  formData.set('password', password)
  formData.set('ajax', '1')

  let response = await rrayClient().fetch(`${baseUrl}/sso/login/login`, {
    method: 'POST',
    body: formData
  })

  if(response.status !== 200) {
    throw new Error('Unable to login: invalid response status code: ' + response.status)
  }

  return rrayClient().extractHeader(response, 'Set-Cookie')
}

export const createCrawlerHeiseCt = (sessionCookies: string) => {
  let parsedSessionCookies = setCookie.parse(sessionCookies)
  let cache: Cache

  const _fetch = async (url: string, useCache: Boolean = false) : Promise<Response> => {
    if(!cache) {
      cache = await caches.open('heise/ct')
    }

    if(useCache) {
      let response = await cache.match(url)
      if(response){
        console.log("[CACHE] Use cache for " + url)

        const location = response.headers.get('Location')
        if(location) {
          if(location.startsWith('http')) {
            return _fetch(location, useCache)
          }
          return _fetch(`${baseUrl}${response.headers.get('Location')}`, useCache)
        }

        return response
      }
    }

    return rrayClient().fetch(url, {
      headers: {
        'Cookie': parsedSessionCookies.map((c: setCookie.Cookie) => `${c.name}=${c.value}`).join('; ')
      }
    })
    .then((response: Response) => {
      const location = response.headers.get('Location')
      if(response.status >= 300 && response.status < 400 && location) {
        if (location.startsWith('http')) {
          return cache.put(url, response).then(() => _fetch(location, useCache))
        }

        return cache.put(url, response).then(() => _fetch(`${baseUrl}${response.headers.get('Location')}`, useCache))
      }
      if(response.status >= 400) {
        // do not cache unsuccessful responses
        return response
      }

      return cache.put(url, response).then(() => cache.match(url))
    })
  }

  return {
    list() {
      return _fetch(`${baseUrl}/select/ct/`)
      .then((response: Response) => response.text())
      .then((content: string) => new DOMParser().parseFromString(content, 'text/html'))
      .then((doc: Document) => {
        let result = Array.from(doc.querySelectorAll('section.magazine--ct'))
        .filter(c => !c.querySelector('button.magazine__link--pay')) //only magazines which are bought
        .map(e => {
          const link = e.querySelector('a.magazine__link')?.getAttribute('href') || ""
          const linkSplit = link.split("/")
          return {
            year: Number.parseInt(linkSplit[linkSplit.length - 2]),
            number: Number.parseInt(linkSplit[linkSplit.length - 1]),
            title: e.querySelector('.magazin__header')?.textContent?.trim(),
            previewImg: baseUrl + e.querySelector('a-img')?.getAttribute('src'),
            url: baseUrl + link
          }
        })

        return result
      })
    },

    getTableOfContent(year: number, number: number){
      return _fetch(`${baseUrl}/select/ct/${year}/${number}`, true)
      .then((response: Response) => response.text())
      .then((content: string) => new DOMParser().parseFromString(content, 'text/html'))
      .then((doc: Document) => {
        let result = Array.from(doc.querySelectorAll('article ul.xp__toc'))
          .map(e => {
            let content = Array.from(e.querySelectorAll('li'))
              .map(c => {
                return {
                  title: c.innerText
                    .trim()
                    .replace(/\s+/g, ' ')
                    .replace(/[0-9]*$/, "")
                    .trim(),
                  page: Number.parseInt(c.querySelector('span.xp__toc__page')?.textContent || "")
                }
              })

            return {
              section: e.previousElementSibling?.textContent?.trim(),
              content
            }
          })

        return result
      })
    },

    getArticle(year: number, number: number, page: number): Promise<Article> {
      return _fetch(`${baseUrl}/select/ct/${year}/${number}/seite-${page}`, true)
      .then((response: Response) => response.text())
      .then((content: string) => new DOMParser().parseFromString(content, 'text/html'))
      .then((doc: Document) : Article => {
        let article = doc.querySelector('article.xp__article')
        if(!article) {
          throw new Error(`no article found: ${year}/${number} page ${page}`)
        }

        return parseArticle(article)
      })
    }
  }
}