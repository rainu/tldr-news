import{O as o}from"./Overview.8515fb55.js";import{u as i}from"./openai.00fabfb9.js";import{_ as c,f as l,z as m,k as p}from"./entry.25a96883.js";import"./index.ccbed6fa.js";const u=a=>{const t=i().$state.cors.proxy;return $fetch(`${t}${a}`)},h=(a=u)=>({crawl(){return a("https://www.heise.de/newsticker/").then(t=>new DOMParser().parseFromString(t,"text/html")).then(t=>Array.from(t.querySelectorAll("section.archive__day article.a-article-teaser")).filter(e=>!e.getElementsByTagName("a")[0].getAttribute("href").endsWith(".teaser")).map(e=>({title:e.querySelector(".a-article-teaser__title-text").innerText,url:"https://www.heise.de"+e.getElementsByTagName("a")[0].getAttribute("href"),date:new Date(e.getElementsByTagName("time")[0].getAttribute("datetime"))})))},read(t){return a(t).then(r=>new DOMParser().parseFromString(r,"text/html")).then(r=>({content:Array.from(r.getElementsByTagName("article")[0].querySelectorAll("p:not([class])")).filter(e=>!e.hasAttributes()).map(e=>e.textContent).join(" ").trim(),teaserImg:"https://www.heise.de"+r.querySelector("a-img").getAttribute("src")}))}}),w={components:{Overview:o},methods:{createCrawlerHeise:h}};function g(a,t,r,e,f,s){const n=l("Overview");return p(),m(n,{crawler:s.createCrawlerHeise()},null,8,["crawler"])}const A=c(w,[["render",g]]);export{A as default};