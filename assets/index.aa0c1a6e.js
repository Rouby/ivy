var X=Object.defineProperty,Y=Object.defineProperties;var _=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var Q=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var B=(r,t,n)=>t in r?X(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n,y=(r,t)=>{for(var n in t||(t={}))Q.call(t,n)&&B(r,n,t[n]);if(R)for(var n of R(t))z.call(t,n)&&B(r,n,t[n]);return r},v=(r,t)=>Y(r,_(t));import{Q as V,j as e,a as q,T as G,O as U,b as $,c,L as S,B as K,d as J,e as Z,f as ee,r as u,u as te,g as re,h as ne,i as ie,k as oe,l as se,R as ae,m as b,n as le}from"./vendor.8a54975d.js";const ce=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}};ce();const de="modulepreload",C={},ue="/ivy/",he=function(t,n){return!n||n.length===0?t():Promise.all(n.map(l=>{if(l=`${ue}${l}`,l in C)return;C[l]=!0;const i=l.endsWith(".css"),o=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${o}`))return;const a=document.createElement("link");if(a.rel=i?"stylesheet":de,i||(a.as="script",a.crossOrigin=""),a.href=l,document.head.appendChild(a),i)return new Promise((d,h)=>{a.addEventListener("load",d),a.addEventListener("error",h)})})).then(()=>t())},me={fonts:{body:'"Segoe UI", Roboto, "Helvetica Neue", sans-serif',heading:'"Segoe UI", Roboto, "Helvetica Neue", sans-serif',monospace:"Menlo, monospace"},fontSizes:[12,14,16,20,24,32,48,64],fontWeights:{body:400,heading:700},colors:{text:"#000",background:"#fff",primary:"#33e",muted:"#ddd"},breakpoints:["40em","@media (min-width: 56em) and (orientation: landscape)"],styles:{root:{fontFamily:"body",fontSize:1,fontWeight:"body",lineHeight:"1.2"},a:{color:"primary"}}},pe=new V;function fe(){return e($,{theme:me,children:e(q,{client:pe,children:e(G.root,{sx:{maxWidth:[380,720],marginX:"auto",paddingX:3},children:e(U,{})})})})}function ge({icon:r,title:t,text:n}){return c("div",{sx:{display:"grid",gridTemplateAreas:`
          'icon title actions'
          'icon desc  actions'`,gridTemplateColumns:"40px 1fr auto",alignItems:"center",borderRadius:8,background:"#fff",color:"#000",paddingY:2},children:[e("span",{sx:{gridArea:"icon",justifySelf:"center"},children:r}),e("span",{sx:{gridArea:"title",fontWeight:"bold"},children:t}),e("span",{sx:{gridArea:"desc"},children:n}),e("span",{sx:{gridArea:"actions",justifySelf:"center",writingMode:"vertical-lr"},children:"..."})]})}function T({to:r,children:t}){return e(S,{to:r,children:t})}const D={PadLock:K,LightbulbOn:J,LightbulbOff:Z,Thermometer:ee};function xe({date:r,entries:t}){return c("section",{children:[c("h2",{children:[r,":"]}),t.length===0?e("span",{children:"No events logged"}):e("div",{sx:{display:"grid",gridTemplateColumns:"auto auto auto 1fr",rowGap:1,columnGap:2},children:t.map(({timestamp:n,icon:l,device:i,description:o},a)=>{const d=l in D?D[l]:"i";return c("div",{sx:{display:"contents"},children:[e("span",{children:e(ye,{value:n})}),e("span",{children:e(d,{})}),e("span",{children:i}),e("span",{children:o})]},a)})})]},r)}function ye({value:r}){const t=new Intl.DateTimeFormat([],{dateStyle:"short",timeStyle:"short"});return e(u.exports.Fragment,{children:t.format(new Date(r))})}function ve(){const{deviceId:r}=te(),{data:t}=re(["device",r],async({queryKey:n})=>await(await fetch(`/ivy/api/devices/${n[1]}`)).json());return e($,{theme:{colors:{text:"#fff",background:"#000",primary:"#0cf"}},children:c("div",{sx:{background:"#000",color:"#fff"},children:[e(T,{to:"/devices",children:"Back"}),e("h1",{children:t==null?void 0:t.name}),c("div",{sx:{display:"grid",gridTemplateAreas:`
            'temp status'
            'temp unit'
            'desc desc'`,gridTemplateColumns:"min-content min-content",gridTemplateRows:"auto auto",marginX:"auto"},children:[e("span",{sx:{gridArea:"temp",justifySelf:"end",fontSize:7,fontWeight:"bold",lineHeight:"100%"},children:t==null?void 0:t.value}),e("span",{sx:{gridArea:"unit",alignSelf:"end"},children:t==null?void 0:t.unit}),c("span",{sx:{gridArea:"desc",fontSize:0,textAlign:"center"},children:["Actual ",t==null?void 0:t.valueDesc," in your unit"]}),e("span",{sx:{gridArea:"status",justifySelf:"end"},children:e(be,{value:t==null?void 0:t.status})})]}),c("div",{sx:{display:"flex",flexDirection:"column"},children:[t==null?void 0:t.alerts.map(n=>e(ge,{icon:e(ne,{}),title:n.title,text:n.text},n.title)),e("div",{children:"+ Add alert"})]}),c("div",{sx:{display:"grid",gridTemplateAreas:`
            'title select'
            'graph graph'`,alignItems:"center",gridTemplateRows:"auto 1fr"},children:[e("h2",{sx:{gridArea:"title"},children:"Temperature"}),c("select",{sx:{gridArea:"select",borderColor:"#fff",padding:1,borderRadius:16,backgroundColor:"#000",color:"#fff"},children:[e("option",{children:"Weekly"}),e("option",{children:"Monthly"}),e("option",{children:"Yearly"})]}),t&&e(ke,{alerts:t.alerts,points:t.history})]})]})})}function be({value:r}){return e("span",{sx:{display:"block",width:8,height:8,borderRadius:"50%",backgroundColor:r==="ok"?"greenyellow":r===void 0?"gray":"red"}})}function ke({alerts:r,points:t}){const[n,l]=u.exports.useState(null),[i,o]=u.exports.useState(null),[a,d]=u.exports.useState(null),[h,p]=u.exports.useState(null),{styles:f,attributes:w}=ie(i,a,{modifiers:[{name:"arrow",options:{element:h}}],placement:"auto-start"}),P=Math.min(...t.map(s=>Date.parse(s.timestamp))),E=Math.max(...t.map(s=>Date.parse(s.timestamp))),M=Math.min(...t.map(s=>s.value),...r.flatMap(({threshold:s})=>[s.min,s.max]))-5,I=Math.max(...t.map(s=>s.value),...r.flatMap(({threshold:s})=>[s.min,s.max]))+5,g=300,L=100;function A(s){return(Date.parse(s)-P)/(E-P)*g}function m(s){return 100-(s-M)/(I-M)*L}return c(u.exports.Fragment,{children:[e("svg",{sx:{gridArea:"graph",justifySelf:"stretch",alignSelf:"stretch"},viewBox:`0 0 ${g} ${L}`,preserveAspectRatio:"xMidYMid meet",onMouseMove:s=>{const{left:x,width:W,top:j,height:F}=s.target.getBoundingClientRect(),O=(s.clientX-x)/W*g;(s.clientY-j)/F*L;const N=t.map(k=>v(y({},k),{dX:Math.abs(A(k.timestamp)-O)})).sort((k,H)=>k.dX-H.dX)[0];l(N)},onMouseOut:()=>l(null),children:c(u.exports.Fragment,{children:[r.map(s=>c(u.exports.Fragment,{children:[e("line",{x1:"0",x2:g,y1:m(s.threshold.min),y2:m(s.threshold.min),sx:{stroke:"red",strokeDasharray:"1,1",strokeWidth:.4}}),e("line",{x1:"0",x2:g,y1:m(s.threshold.max),y2:m(s.threshold.max),sx:{stroke:"red",strokeDasharray:"1,1",strokeWidth:.4}})]})),e("path",{d:t.reduce((s,x)=>`${s?`${s} L`:"M"}${A(x.timestamp)},${m(x.value)}`,""),sx:{stroke:"primary",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"}}),n&&e("g",{transform:`translate(${A(n.timestamp)}, ${m(n.value)})`,children:e("circle",{ref:o,r:"2",sx:{pointerEvents:"none",fill:"#fff"}})},n.timestamp)]})}),n&&c("div",v(y({ref:d,style:f.popper},w.popper),{sx:{pointerEvents:"none",padding:2,borderRadius:8,background:"#fff",color:"#000"},children:[n.value,"\xB0C",e("div",{ref:p,style:f.arrow})]}))]})}function Se(){return c(u.exports.Fragment,{children:[e(T,{to:"..",children:"Back"}),e("ul",{children:e("li",{children:e(S,{to:"1",children:"Device 1"})})})]})}function we(){return e(u.exports.Fragment,{children:c("nav",{children:[e(S,{to:"logs",children:"Logs"})," | ",e(S,{to:"devices",children:"Devices"})]})})}function Le(){const{data:r,isLoading:t,fetchNextPage:n,hasNextPage:l}=oe("logs",async({pageParam:o=0})=>await(await fetch(`/ivy/api/logs?page=${o}`)).json(),{getNextPageParam:(o,a)=>o.hasNext?a.length:void 0}),i=r==null?void 0:r.pages.flatMap((o,a,d)=>{var f;const h=o.nodes[o.nodes.length-1],p=(f=d[a+1])==null?void 0:f.nodes[0];if(!h)return[];if(h.date===(p==null?void 0:p.date)){const[w]=d[a+1].nodes.splice(0,1);return v(y({},o),{nodes:[...o.nodes.slice(0,-1),v(y({},h),{entries:[...h.entries,...w.entries]})]})}return o});return c(u.exports.Fragment,{children:[e(T,{to:"..",children:"Back"}),e("h1",{children:"Log data of unit 1"}),e("input",{type:"search",placeholder:"Search...",sx:{padding:2,borderRadius:8,border:"none",background:"#eee",width:"100%"}}),e("label",{htmlFor:"filter",sx:{display:"block",marginTop:3,marginBottom:2},children:"Filter logged events"}),c("select",{id:"filter",sx:{padding:2,borderRadius:8,border:"none",background:"#eee",width:"100%",fontWeight:"bold"},children:[e("option",{children:"Show all"}),e("option",{children:"Show notifications"}),e("option",{children:"Show warnings"}),e("option",{children:"Show alerts"})]}),t&&e("div",{children:"Loading..."}),e("div",{sx:{display:"flex",flexDirection:"column",gap:2,marginY:2},children:i==null?void 0:i.flatMap(o=>o.nodes.map(({date:a,entries:d})=>e(xe,{date:a,entries:d},a)))}),e("button",{onClick:()=>n(),disabled:!l,sx:{backgroundColor:"#000",color:"#fff",paddingX:4,paddingY:2,border:"none",width:"100%",":disabled":{backgroundColor:"muted",color:"#333"}},children:"Load more data"})]})}he(()=>import("./browser.1c6f1b8b.js"),["assets/browser.1c6f1b8b.js","assets/vendor.8a54975d.js"]).then(({worker:r})=>{r.start({serviceWorker:{url:"/ivy/mockServiceWorker.js"}}),Ae()});function Ae(){se.exports.render(e(le,{basename:"/ivy/",children:e(ae,{children:c(b,{path:"/",element:e(fe,{}),children:[e(b,{index:!0,element:e(we,{})}),e(b,{path:"logs",element:e(Le,{})}),e(b,{path:"devices",element:e(Se,{})}),e(b,{path:"devices/:deviceId",element:e(ve,{})})]})})}),document.getElementById("root"))}
