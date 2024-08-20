import{i as l,S as m}from"./assets/vendor-f33cd494.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const p="https://pixabay.com/api",f=t=>{const s=new URLSearchParams({key:"45531869-402fff4ce98a39e1a3b7e2442",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${p}/?${s}`).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()})},h=t=>`
    <li class="gallery-card">
  <a class="gallery-link" href="${t.largeImageURL}">
    <img
      class="gallery-img"
      src="${t.webformatURL}"
      data-source="${t.largeImageURL}"
      alt="${t.tags}"
    />
  </a>
  <div class="wrapper">
    <ul class="img-content-wrapper">
      <li class="text-info">
        Likes<span class="number">${t.likes}</span>
      </li>
      <li class="text-info">
        Views<span class="number">${t.views}</span>
      </li>
      <li class="text-info">
        Comments<span class="number">${t.comments}</span>
      </li>
      <li class="text-info">
        Downloads<span class="number">${t.downloads}</span>
      </li>
    </ul>
  </div>
</li>
    `,i=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),u=document.querySelector(".loader");function y(t){t.preventDefault();const s=i.elements.user_query.value;if(s===""){l.warning({title:"Caution",message:"Input field must not be empty",position:"topLeft"});return}function o(){u.classList.remove("is-hidden")}function a(){u.classList.add("is-hidden")}o(),setTimeout(a,300),f(s).then(e=>{if(!e.hits.length){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}),c.innerHTML="";return}const r=e.hits.map(d=>h(d)).join("");c.innerHTML=r,new m(".js-gallery a",{overlay:!0,captionsData:"alt",overlayOpacity:.8,captionDelay:250,focus:!0}).refresh(),i.reset()}).catch(e=>{console.log(e)})}i.addEventListener("submit",y);
//# sourceMappingURL=commonHelpers.js.map
