import{f as j,o as I}from"./openai.00fabfb9.js";import{_ as R,f as t,k as o,z as s,s as e,q as n,m as u,t as a,v as m,A as F,B as d,l as p,F as D,C,D as M}from"./entry.25a96883.js";const J={name:"NewsTeaser",props:{title:{required:!0,type:String},date:{required:!0,type:Date},url:{required:!0,type:String},crawler:{required:!0,type:Object}},data(){return{content:null,show:!1,summary:null}},computed:{wordCount(){return this.content.content.match(/\b\w+\b/g).length},estimatedReadDuration(){let r=this.wordCount/3.3333333333333335;return j(new Date(0).setSeconds(r),"mm:ss")}},methods:{format:j,read(){this.show=!this.show,!this.content&&this.crawler.read(this.url).then(r=>{this.content=r}).then(()=>I().summary(this.content.content)).then(r=>{try{this.summary=JSON.parse(r)}catch{this.summary={conclusion:r}}})}}},L={class:"pr-2"},U=["href"],G=u("span",null," Uhr",-1),H={key:1},K={key:2};function P(r,w,l,v,c,_){const x=t("Vue3Marquee"),y=t("v-toolbar-title"),g=t("v-icon"),q=t("v-btn"),N=t("v-toolbar-items"),O=t("v-toolbar"),k=t("v-progress-circular"),b=t("v-img"),T=t("v-progress-linear"),S=t("v-col"),V=t("v-row"),h=t("v-chip"),f=t("v-chip-group"),i=t("v-list-item"),z=t("v-list"),A=t("v-card-text"),E=t("v-card");return o(),s(E,{dense:""},{title:e(()=>[n(O,{class:"clickable",onClick:_.read},{default:e(()=>[n(y,null,{default:e(()=>[n(x,null,{default:e(()=>[u("span",L,a(l.title),1)]),_:1})]),_:1}),n(N,null,{default:e(()=>[n(q,{icon:""},{default:e(()=>[u("a",{target:"_blank",href:l.url},[n(g,null,{default:e(()=>[m("mdi-link")]),_:1})],8,U)]),_:1})]),_:1})]),_:1},8,["onClick"])]),subtitle:e(()=>[u("span",null,a(_.format(l.date,r.$t("common.datetime.format.time"))),1),G]),default:e(()=>[c.content?(o(),s(A,{key:0},{default:e(()=>[F(u("div",null,[n(b,{src:c.content.teaserImg},{placeholder:e(()=>[n(k,{indeterminate:"",color:"primary"})]),_:1},8,["src"]),c.summary?d("",!0):(o(),s(T,{key:0,indeterminate:"",color:"primary"})),n(V,null,{default:e(()=>[n(S,{cols:"6"},{default:e(()=>[m(a(r.$t("common.estimation.read"))+" "+a(_.estimatedReadDuration),1)]),_:1}),n(S,{cols:"6",class:"text-right"},{default:e(()=>[m(a(r.$t("common.wordcount"))+" "+a(_.wordCount),1)]),_:1})]),_:1}),c.summary?(o(),p("div",H,[c.summary.topics?(o(),s(f,{key:0},{default:e(()=>[(o(!0),p(D,null,C(c.summary.topics,B=>(o(),s(h,null,{default:e(()=>[m(a(B),1)]),_:2},1024))),256))]),_:1})):d("",!0),c.summary.points?(o(),s(z,{key:1},{default:e(()=>[(o(!0),p(D,null,C(c.summary.points,B=>(o(),s(i,null,{prepend:e(()=>[n(g,null,{default:e(()=>[m("mdi-star")]),_:1})]),default:e(()=>[u("span",null,a(B),1)]),_:2},1024))),256))]),_:1})):d("",!0),c.summary.conclusion?(o(),p("p",K,a(c.summary.conclusion),1)):d("",!0)])):d("",!0)],512),[[M,c.show]])]),_:1})):d("",!0)]),_:1})}const Q=R(J,[["render",P]]);const W={name:"NewsOverview",components:{Teaser:Q},props:{crawler:{required:!0,type:Object}},data(){return{loaded:!1,sectionShow:{},entries:[]}},methods:{format:j,collapseSection(r){this.sectionShow[r]=!this.sectionShow[r]}},mounted(){this.crawler.crawl().then(r=>{let w=new Date().getDate(),l=[];for(let v of r)v.date.getDate()!==w&&(this.entries.push(l),l=[],w=v.date.getDate()),l.push(v);this.sectionShow[0]=!0,this.entries.push(l),this.loaded=!0})}},X={class:"text-center"};function Y(r,w,l,v,c,_){const x=t("v-progress-circular"),y=t("v-icon"),g=t("v-btn"),q=t("v-toolbar"),N=t("v-card-title"),O=t("Teaser"),k=t("v-col"),b=t("v-row"),T=t("v-card-text"),S=t("v-card"),V=t("v-container");return o(),s(V,null,{default:e(()=>[F(u("div",X,[n(x,{indeterminate:"",color:"primary"})],512),[[M,!c.loaded]]),(o(!0),p(D,null,C(c.entries,(h,f)=>(o(),s(b,{key:h[0].date.getDate(),dense:""},{default:e(()=>[n(k,{cols:"12"},{default:e(()=>[n(S,null,{default:e(()=>[n(N,{onClick:i=>_.collapseSection(f),class:"clickable"},{default:e(()=>[n(q,{title:_.format(h[0].date,r.$t("common.datetime.format.date"))},{default:e(()=>[n(g,{icon:""},{default:e(()=>[c.sectionShow[f]?(o(),s(y,{key:0},{default:e(()=>[m("mdi-arrow-collapse")]),_:1})):(o(),s(y,{key:1},{default:e(()=>[m("mdi-arrow-expand")]),_:1}))]),_:2},1024)]),_:2},1032,["title"])]),_:2},1032,["onClick"]),F(n(T,null,{default:e(()=>[(o(!0),p(D,null,C(h,i=>(o(),s(b,{key:i.url,dense:""},{default:e(()=>[n(k,{cols:"12"},{default:e(()=>[n(O,{title:i.title,date:i.date,url:i.url,crawler:l.crawler},null,8,["title","date","url","crawler"])]),_:2},1024)]),_:2},1024))),128))]),_:2},1536),[[M,c.sectionShow[f]]])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})}const ee=R(W,[["render",Y]]);export{ee as O};
