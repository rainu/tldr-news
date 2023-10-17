import {baseUrl} from "~/services/books/heise/ct";

const validUrl = (element: Element | null, attributeName: string): string => {
  if(!element) return "";

  let attribute = element.getAttribute(attributeName)
  if(!attribute) return "";

  if(attribute.startsWith("http")) {
    return attribute
  }
  return baseUrl + attribute
}

export type ArticleFigure = {
  t: 'figure'
  Caption: string | undefined
  Source: string
}

const mapFigure = (element: Element): ArticleFigure => ({
  t: 'figure',
  Caption: element.querySelector('figcaption')?.textContent.trim(),
  Source: validUrl(element.querySelector('a-img'), 'src'),
})

export type ArticleHeader = {
  t: 'header'
  Figure: ArticleFigure | undefined
  Title: string | undefined
  Subtitle: string | undefined
  Abstract: string | undefined
  Author: string | undefined
}

const mapHeader = (element: Element): ArticleHeader => ({
  t: 'header',
  Figure: element.querySelector('figure') ? mapFigure(element.querySelector('figure')) : undefined,
  Title: element.querySelector('h2')?.innerText.trim(),
  Subtitle: element.querySelector('h1')?.innerText.trim(),
  Abstract: element.querySelector('p.xp__header__abstract')?.textContent?.trim(),
  Author: element.querySelector('.xp__header__authors')?.textContent?.trim(),
})

export type ArticleSubHeader = {
  t: 'subheader',
  Title: string
}

const mapSubHeader = (element: Element): ArticleSubHeader => ({
  t: 'subheader',
  Title: element.textContent.trim()
})

export type ArticleParagraph = {
  t: 'paragraph'
  Content: string
}

const mapParagraph = (element: Element): ArticleParagraph => ({
  t: "paragraph",
  Content: element.textContent.trim() || ""
})

export type ArticleCodeblock = {
  t: 'codeblock'
  Content: string
}

const mapCodeblock = (element: Element): ArticleCodeblock => ({
  t: "codeblock",
  Content: element.textContent.trim() || ""
})

export type ArticleVita = {
  t: "vita"
  Image: string
  Signature: string
  Name: string
}

const mapVita = (element: Element): ArticleVita => ({
  t: "vita",
  Image: validUrl(element.querySelector('figure.xp__vita__image a-img'), 'src'),
  Signature: validUrl(element.querySelector('figure.xp__vita__signature a-img'), 'src'),
  Name: element.querySelector('p.xp__vita__name')?.textContent.trim()
})

export type ArticleListing = {
  t: 'listing'
  Items: ArticleListingItem[]
}

export type ArticleListingItem = {
  t: 'listingItem'
  Text: string
}

const mapArticleListingItem = (element: Element): ArticleListingItem => ({
  t: "listingItem",
  Text: element.textContent?.trim() || ""
})

const mapArticleListing = (element: Element): ArticleListing => ({
  t: "listing",
  Items: Array.from(element.querySelectorAll('li')).map(mapArticleListingItem)
})

export type ArticleAsset = {
  t: 'asset',
  Title: string | null
  Subtitle: string | null
  Content: (ArticleParagraph | ArticleFigure | ArticleRating | ArticleListing)[]
}

const mapAsset = (element: Element): ArticleAsset => ({
  t: 'asset',
  Title: element.querySelector('h4')?.textContent?.trim() || null,
  Subtitle: element.querySelector('h3')?.textContent?.trim() || null,
  Content: Array.from(element.querySelectorAll('p, pre.xp__codeblock, figure, div.xp__rating, ul:not(.xp__rating__list, .xp__toc)')).map(e => {
    if(e.tagName === 'P') return mapParagraph(e)
    if(e.tagName === 'PRE') return mapCodeblock(e)
    if(e.tagName === 'FIGURE') return mapFigure(e)
    if(e.tagName === 'UL') return mapArticleListing(e)
    return mapRating(e)
  })
})

export type ArticleRatingList = {
  t: 'rating-list'
  Items: ArticleRatingListItem[]
}

export type ArticleRatingListItem = {
  t: 'rating-list-item'
  Icon: any
  Text: string
}

export type ArticleRating = {
  t: 'rating'
  Ratings: ArticleRatingList[]
}

const mapRatingItem = (element: Element): ArticleRatingListItem => ({
  t: 'rating-list-item',
  Text: element.querySelector('span.xp__rating__text').textContent.trim(),
  Icon: element.querySelector('svg')
})

const mapRatingList = (element: Element): ArticleRatingList => ({
  t: 'rating-list',
  Items: Array.from(element.querySelectorAll('li')).map(mapRatingItem)
})

const mapRating = (element: Element): ArticleRating => ({
  t: 'rating',
  Ratings: Array.from(element.querySelectorAll('ul.xp__rating__list')).map(mapRatingList)
})

export type ArticleTable = {
  t: 'table'
  Title: string | null
  Header: ArticleTableRow | null
  Body: ArticleTableRow[]
  Footer: ArticleTableRow | null
}

export type ArticleTableRow = {
  t: 'tableRow'
  Cells: ArticleTableRowCell[]
}

export type ArticleTableRowCell = (string)

const mapTable = (element: Element): ArticleTable => {
  let theadRows = Array.from(element.querySelectorAll('thead tr'))
  let firstTheadRow;
  let lastTheadRow;

  if(theadRows.length >= 1) {
    firstTheadRow = theadRows[0]
  }
  if(theadRows.length >= 2) {
    lastTheadRow = theadRows.pop()
  }

  let tfootRow = Array.from(element.querySelectorAll('tfoot tr')).pop()
  return {
    t: "table",
    Title: firstTheadRow ? (firstTheadRow.textContent?.trim() || "") : null,
    Header: lastTheadRow ? mapTableRow(lastTheadRow) : null,
    Body: Array.from(element.querySelectorAll('tbody tr')).map(mapTableRow),
    Footer: tfootRow ? mapTableRow(tfootRow) : null,
  }
}

const mapTableRow = (element: Element | null): ArticleTableRow => ({
  t: "tableRow",
  Cells: Array.from(element.querySelectorAll('td')).map(mapTableCell)
})

const mapTableCell = (element: Element): ArticleTableRowCell => {

  return element.textContent?.trim() || ""
}

export type ArticleBibliography = {
  t: 'bibliography'
  Title: string | null
  Items: ArticleBibliographyItem[]
}

export type ArticleBibliographyItem = {
  t: 'bibliographyItem'
  Text: string
  Link: string
}

const mapBibliography = (element: Element): ArticleBibliography => ({
  t: "bibliography",
  Title: element.querySelector('.xp__bibliography__title')?.textContent?.trim() || null,
  Items: Array.from(element.querySelectorAll('li.xp__bibliography__list-item')).map(mapBibliographyItem)
})

const mapBibliographyItem = (element: Element): ArticleBibliographyItem => ({
  t: "bibliographyItem",
  Text: element.textContent?.trim() || "",
  Link: validUrl(element.querySelector('a'), 'href')
})

export type ArticleShortUrl = {
  t: 'shorturl'
  Description: string | null
  Link: string
}

const mapShortUrl = (element: Element): ArticleShortUrl => ({
  t: "shorturl",
  Description: element.querySelector("strong")?.textContent?.trim() || null,
  Link: validUrl(element.querySelector("a"), 'href'),
})

export type ArticleSection = {
  t: 'section'
  Title: string | null
  Content: ArticleSectionContentElement[]
}

type ArticleElement = (ArticleFigure | ArticleVita | ArticleHeader | ArticleSubHeader | ArticleParagraph | ArticleCodeblock | ArticleAsset)
type ArticleSectionContentElement = (ArticleFigure | ArticleParagraph | ArticleCodeblock)
type ArticleContent = ArticleContentElement[]
type ArticleContentElement = (ArticleHeader | ArticleSection | ArticleVita | ArticleAsset | ArticleBibliography | ArticleShortUrl)

export type Article = {
  DocumentElement: Element
  Content: ArticleContent
}

export const parseArticle = (article: Element): Article => {
  let content: ArticleElement[] = Array.from(article.children)
    .map(e => {
      if(e.tagName === 'HEADER') return mapHeader(e)
      if(e.tagName === 'P' && e.classList.contains('xp__paragraph')) return mapParagraph(e)
      if(e.tagName === 'P' && e.classList.contains('xp__shorturl')) return mapShortUrl(e)
      if(e.tagName === 'PRE' && e.classList.contains('xp__codeblock')) return mapCodeblock(e)
      if(e.tagName === 'DIV' && e.classList.contains('xp__vita')) return mapVita(e)
      if(e.tagName === 'DIV' && e.getAttribute('class')?.includes('xp__table')) return mapTable(e.querySelector('table') || e)
      if(e.tagName === 'FIGURE') return mapFigure(e)
      if(e.tagName === 'ASIDE' && e.classList.contains('xp__asset')) return mapAsset(e)
      if(e.tagName === 'ASIDE' && e.classList.contains('xp__bibliography')) return mapBibliography(e)
      if(e.tagName === 'H3') return mapSubHeader(e)

      return null
    })
    .filter(e => e !== null)
    .filter(e => e.t !== 'asset' || e.Content.length !== 0)

  //group paragraphs together in segments
  let groupedContent: ArticleContent = []
  let currentSection: ArticleSection = {
    t: 'section',
    Content: []
  }

  for (let curPart of content) {
    switch(curPart.t) {
      case "subheader": {
        //close the current section and start a new one
        groupedContent.push(currentSection)
        currentSection = {
          t: 'section',
          Title: curPart.Title,
          Content: []
        }
        break
      }
      case "figure":
      case "codeblock":
      case "paragraph": {
        currentSection.Content.push(curPart)
        break
      }
      default:
        if(currentSection.Content.length !== 0) {
          groupedContent.push(currentSection)
        }
        currentSection = {
          t: 'section',
          Content: []
        }
        groupedContent.push(curPart)
    }
  }

  if(currentSection.Content.length !== 0) {
    groupedContent.push(currentSection)
  }

  return {
    DocumentElement: article,
    Content: groupedContent
  }
}