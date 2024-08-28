import{a as h,S as w,i}from"./assets/vendor-d93b82f1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();h.defaults.baseURL="https://pixabay.com/api";const m=(s,t)=>{const a={params:{key:"45531869-402fff4ce98a39e1a3b7e2442",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}};return h.get("/",a)},f=s=>`
    <li class="gallery-card">
  <a class="gallery-link" href="${s.largeImageURL}">
    <img
      class="gallery-img"
      src="${s.webformatURL}"
      data-source="${s.largeImageURL}"
      alt="${s.tags}"
    />
  </a>
  <div class="wrapper">
    <ul class="img-content-wrapper">
      <li class="text-info">
        Likes<span class="number">${s.likes}</span>
      </li>
      <li class="text-info">
        Views<span class="number">${s.views}</span>
      </li>
      <li class="text-info">
        Comments<span class="number">${s.comments}</span>
      </li>
      <li class="text-info">
        Downloads<span class="number">${s.downloads}</span>
      </li>
    </ul>
  </div>
</li>
    `,n=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),y=document.querySelector(".loader"),u=document.querySelector(".js-load-more");let o=1,d="",g=0;const L=new w(".js-gallery a",{overlay:!0,captionsData:"alt",overlayOpacity:.8,captionDelay:250,focus:!0});function b(){y.classList.remove("is-hidden")}function v(){y.classList.add("is-hidden")}const S=async s=>{try{b(),s.preventDefault(),d=n.elements.user_query.value.trim(),o=1;const t=await m(d,o);if(console.log(t),d===""){i.warning({title:"Caution",message:"Input field must not be empty",position:"topLeft"});return}if(t.data.hits.length===0){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}),c.innerHTML="",n.reset();return}const a=t.data.hits.map(r=>f(r)).join("");c.innerHTML=a,g=c.querySelector("li").getBoundingClientRect().height,u.classList.remove("is-hidden"),L.refresh();const e=Math.ceil(t.data.totalHits/15);o>=e&&(u.classList.add("is-hidden"),i.info({title:"Info",message:"We are sorry,but you have reached the end of search results"}))}catch(t){console.log(t)}finally{v()}n.reset()},q=async s=>{try{b(),o++;const t=await m(d,o);console.log(t);const a=t.data.hits.map(e=>f(e)).join("");c.insertAdjacentHTML("beforeend",a),scrollBy({top:g*2,behavior:"smooth"}),L.refresh();const l=Math.ceil(t.data.totalHits/15);o>=l&&(u.classList.add("is-hidden"),i.info({title:"Info",message:"We are sorry,but you have reached the end of search results"}))}catch(t){console.log(t)}finally{v()}n.reset()};n.addEventListener("submit",S);u.addEventListener("click",q);
//# sourceMappingURL=commonHelpers.js.map
