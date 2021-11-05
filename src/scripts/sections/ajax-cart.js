var t={d:(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{x$:()=>P,nd:()=>I,yF:()=>O,fi:()=>F,Be:()=>U,jQ:()=>M,KJ:()=>N,Q4:()=>H,w0:()=>J});const r={productFormsFilter:t=>!0,messageBuilder:t=>{let e="";return t.forEach((t=>{e+=`<div class="js-ajax-cart-message js-ajax-cart-message--${t.type}">${t.text}</div>`})),e},lineItemQuantityErrorText:"You can't add more of this item to your cart",requestErrorText:"There was an error while updating your cart. Please try again."};let a={};const o=(t={})=>{a={...r,...t},a.computed={productFormsErrorsAttribute:"data-ajax-cart-form-error",sectionsAttribute:"data-ajax-cart-section",binderAttribute:"data-ajax-cart-bind-state",requestButtonAttribute:"data-ajax-cart-request-button",toggleClassButtonAttribute:"data-ajax-cart-toggle-class-button",initialStateAttribute:"data-ajax-cart-initial-state",sectionScrollAreaAttribute:"data-ajax-cart-section-scroll",quantityInputAttribute:"data-ajax-cart-quantity-input",messagesAttribute:"data-ajax-cart-messages",cartStateSetBodyClass:"js-ajax-cart-set",requestInProgressBodyClass:"js-ajax-cart-request-in-progress",emptyCartBodyClass:"js-ajax-cart-empty",notEmptyCartBodyClass:"js-ajax-cart-not-empty",productFormsProcessingClass:"js-ajax-cart-form-in-progress"}},s=[],n=t=>{switch(t){case"add":return"/cart/add.js";case"change":return"/cart/change.js";case"get":return"/cart.js";case"clear":return"/cart/clear.js";case"update":return"/cart/update.js";default:return}},i=(t,e,r={})=>{const a=n(t);let o;"get"!==t&&(o=e);const i="get"===t?"GET":"POST",c=r.info||{},u="firstComplete"in r?[r.firstComplete]:[],d={requestType:t,endpoint:a};s.forEach((e=>{try{e({requestType:t,endpoint:a,info:c,requestBody:o},(t=>u.push(t)))}catch(t){console.error("Liquid Ajax Cart: Error during Ajax request subscriber callback in ajax-api"),console.error(t)}})),"lastComplete"in r&&u.push(r.lastComplete),d.requestBody=o,d.info=c;const l={method:i};"get"!==t&&(o instanceof FormData||o instanceof URLSearchParams?(l.body=o,l.headers={"x-requested-with":"XMLHttpRequest"}):(l.body=JSON.stringify(o),l.headers={"Content-Type":"application/json"})),fetch(a,l).then((t=>t.json().then((e=>({ok:t.ok,status:t.status,body:e}))))).then((e=>(d.responseData=e,"add"!==t?d:fetch(n("get"),{method:"GET",headers:{"Content-Type":"application/json"}}).then((t=>t.json().then((e=>(d.extraResponseData={ok:t.ok,status:t.status,body:e},d)))))))).catch((t=>{console.error("Liquid Ajax Cart: Error while performing cart Ajax request"),console.error(t),d.fetchError=t})).finally((()=>{u.forEach((t=>{try{t(d)}catch(t){console.error("Liquid Ajax Cart: Error during Ajax request result callback in ajax-api"),console.error(t)}}))}))},c=t=>{i("get",void 0,t)},u=(t,e)=>{i("add",t,e)},d=(t,e)=>{i("change",t,e)},l=(t,e)=>{i("update",t,e)},p=(t,e)=>{i("clear",t,e)},m=t=>{s.push(t)},h={all:0},f=[];let y={},q={requestInProgress:!1,cartStateSet:!1};const g=()=>{q.requestInProgress=h.all>0,q.cartStateSet="item_count"in y,S()},b=t=>{try{t({cart:y,status:q}),f.push(t)}catch(t){console.log("Liquid Ajax Cart: Error during subscribing to the state"),console.error(t)}},A=()=>({cart:y,status:q}),S=()=>{f.forEach((t=>{try{t({cart:y,status:q})}catch(t){console.error(t)}}))},j=t=>{const e=a.computed.binderAttribute;t.status.cartStateSet&&document.querySelectorAll(`[${e}]`).forEach((t=>{const r=t.getAttribute(e),a=x(r);void 0!==a&&(t.innerText=a)}))},x=t=>{const[e,...r]=t.split("|");let a=C(e);return r.forEach((t=>{const e=t.trim();""!==e&&(e in L?a=L[e](a):console.error(`Liquid Ajax Cart: the "${e}" formatter doesn't exist`))})),a};function C(t,e=A()){A();const r=t.split("."),a=r.shift().trim();return a in e&&r.length>0?C(r.join("."),e[a]):e[a]}const L={amount:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount }}")},amount_no_decimals:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_no_decimals }}")},amount_with_comma_separator:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_with_comma_separator }}")},amount_no_decimals_with_comma_separator:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_no_decimals_with_comma_separator }}")},amount_with_apostrophe_separator:t=>{if("Shopify"in window&&"formatMoney"in Shopify)return Shopify.formatMoney(t,"{{ amount_with_apostrophe_separator }}")}};function w(t){const{requestButtonAttribute:e}=a.computed;let r;const o=["/cart/change","/cart/add","/cart/clear","/cart/update"];if(this.hasAttribute(e)){const t=this.getAttribute(e);if(t){let a;try{if(a=new URL(t,window.location.origin),!o.includes(a.pathname))throw"URL should be one of the following: /cart/change, /cart/add, /cart/update, /cart/clear";r=a}catch(t){console.error(`Liquid Ajax Cart: ${e} contains an invalid URL as a parameter.`,t)}}}if(void 0===r&&this.hasAttribute("href")&&"A"===this.tagName.toUpperCase()){const t=new URL(this.href);o.includes(t.pathname)?r=t:this.hasAttribute(e)&&console.error(`Liquid Ajax Cart: a link with the ${e} contains an invalid href URL.`,"URL should be one of the following: /cart/change, /cart/add, /cart/update, /cart/clear")}if(void 0===r)return;if(t.preventDefault(),A().status.requestInProgress)return;const s=new FormData;switch(r.searchParams.forEach(((t,e)=>{s.append(e,t)})),r.pathname){case"/cart/add":u(s,{info:{initiator:this}});break;case"/cart/change":d(s,{info:{initiator:this}});break;case"/cart/update":l(s,{info:{initiator:this}});break;case"/cart/clear":p({},{info:{initiator:this}})}}function E(t){const{toggleClassButtonAttribute:e}=a.computed;if(!this.hasAttribute(e))return;t.preventDefault();const r=this.getAttribute(e).split("|");if(!r)return void console.error("Liquid Ajax Cart: Error while toggling body class");const o=r[0].trim();let s=r[1]?r[1].trim():"toggle";if("add"!==s&&"remove"!==s&&(s="toggle"),o)try{"add"===s?document.body.classList.add(o):"remove"===s?document.body.classList.remove(o):document.body.classList.toggle(o)}catch(t){console.error("Liquid Ajax Cart: Error while toggling body class:",o),console.error(t)}}function v(t){const{quantityInputAttribute:e}=a.computed;if(!this.hasAttribute(e))return;if(t.preventDefault(),A().status.requestInProgress)return;let r=Number(this.value.trim());const o=this.getAttribute(e).trim();if(isNaN(r))return void console.error("Liquid Ajax Cart: input value of a data-ajax-cart-quantity-input must be an Integer number");if(r<1&&(r=0),!o)return void console.error("Liquid Ajax Cart: attribute value of a data-ajax-cart-quantity-input must be an item key");const s=new FormData;s.set("id",o),s.set("quantity",r),d(s,{info:{initiator:this}}),this.blur()}function _(t){const{quantityInputAttribute:e}=a.computed;if(!this.hasAttribute(e))return;const r=this,o=A();if(o.status.cartStateSet){const t=o.cart.items.find((t=>t.key===r.getAttribute(e).trim()));t&&(r.value=t.quantity)}this.blur()}const $=new WeakMap;function T(t){const e=$.get(t);a.computed.productFormsProcessingClass&&(e>0?t.classList.add(a.computed.productFormsProcessingClass):t.classList.remove(a.computed.productFormsProcessingClass))}const R=(t,e)=>{const{messagesAttribute:r}=a.computed;let o,s,n,i=[];if(t.requestBody instanceof FormData||t.requestBody instanceof URLSearchParams?(o=t.requestBody.get("id"),s=t.requestBody.get("quantity")):(o=t.requestBody.id,s=t.requestBody.quantity),o){const t=A();if(t.status.cartStateSet&&t.cart.items.forEach((t=>{i.push(t)})),o.indexOf(":")>-1)n=document.querySelectorAll(`[${r}="${o}"]`);else{const t=i.map((t=>`[${r}="${t.key}"]`));n=document.querySelectorAll(t.join(","))}n.length>0&&n.forEach((t=>{t.innerHTML=""}))}e((t=>{const{lineItemQuantityErrorText:e,messageBuilder:r}=a,{messagesAttribute:i}=a.computed;let c=[];const u=[];if(t.responseData?.ok){o&&(c=t.responseData.body.items.reduce(((t,e)=>(e.key!==o&&e.id!==o||t.push(e),t)),[])),c.forEach((t=>{t.quantity<s&&u.push(t)}));const a=u.reduce(((t,e)=>(t.push(`[${i}="${e.key}"]`),t)),[]);n=[],a.length>0&&(n=document.querySelectorAll(a.join(","))),n.forEach((a=>{a.innerHTML=r([{type:"error",text:e,code:"line_item_quantity_error",requestState:t}])}))}else{const e=D(t);if(o.indexOf(":")>-1)n=document.querySelectorAll(`[${i}="${o}"]`);else{c=[];const t=A();t.status.cartStateSet&&t.cart.items.forEach((t=>{c.push(t)}));const e=c.map((t=>`[${i}="${t.key}"]`));n=document.querySelectorAll(e.join(","))}n.length>0&&n.forEach((t=>{t.innerHTML=r([e])}))}}))},B=(t,e)=>{const r=t.info?.initiator;let o;r instanceof HTMLFormElement&&(o=r.querySelectorAll(`[${a.computed.messagesAttribute}="form"]`),o.length>0&&o.forEach((t=>{t.innerHTML=""}))),e((t=>{const{messageBuilder:e}=a,r=D(t);r&&o&&o.forEach((t=>{t.innerHTML=e([r])}))}))},D=t=>{const{requestErrorText:e}=a;if(!t.responseData?.ok){if("responseData"in t){if("description"in t.responseData.body)return{type:"error",text:t.responseData.body.description,code:"shopify_error",requestState:t};if("message"in t.responseData.body)return{type:"error",text:t.responseData.body.message,code:"shopify_error",requestState:t}}return{type:"error",text:e,code:"request_error",requestState:t}}},k=t=>{const{cartStateSetBodyClass:e,requestInProgressBodyClass:r,emptyCartBodyClass:o,notEmptyCartBodyClass:s}=a.computed;e&&(t.status.cartStateSet?document.body.classList.add(e):document.body.classList.remove(e)),r&&(t.status.requestInProgress?document.body.classList.add(r):document.body.classList.remove(r)),o&&(t.status.cartStateSet&&0===t.cart.item_count?document.body.classList.add(o):document.body.classList.remove(o)),s&&(t.status.cartStateSet&&0===t.cart.item_count?document.body.classList.remove(s):document.body.classList.add(s))};"liquidAjaxCart"in window||(o(),(()=>{m(((t,e)=>{h.all++,g(),e((t=>{(t=>{h.all--,"responseData"in t&&t.responseData.ok&&("add"===t.requestType?"extraResponseData"in t&&t.extraResponseData.ok?y=t.extraResponseData.body:c():y=t.responseData.body)})(t),g()}))}));const t=document.querySelector(`[${a.computed.initialStateAttribute}]`);if(t)try{const e=JSON.parse(t.textContent);if(!("item_count"in e))throw`JSON from ${a.computed.initialStateAttribute} script is not correct cart object`;y=e,g()}catch(t){console.error(`Liquid Ajax Cart: can't parse cart JSON from the "${a.computed.initialStateAttribute}" script. A /cart.js request will be performed to receive the cart state`),console.error(t),c()}else c()})(),b(j),j(A()),m(((t,e)=>{const{sectionsAttribute:r,sectionScrollAreaAttribute:o}=a.computed;if(void 0!==t.requestBody){const e=[];document.querySelectorAll(`[${r}]`).forEach((t=>{const r=t.closest('[id^="shopify-section-"]');if(r){const t=r.id.replace("shopify-section-","");-1===e.indexOf(t)&&e.push(t)}})),e.length&&(t.requestBody instanceof FormData||t.requestBody instanceof URLSearchParams?t.requestBody.append("sections",e.join(",")):t.requestBody.sections=e.join(","))}e((t=>{const{sectionsAttribute:e,sectionScrollAreaAttribute:r}=a.computed,o=new DOMParser;if(t.responseData?.ok&&"sections"in t.responseData.body){const a=t.responseData.body.sections;for(let t in a)a[t]?document.querySelectorAll(`#shopify-section-${t}`).forEach((s=>{const n="__noId__",i={};s.querySelectorAll(` [${r}] `).forEach((t=>{let e=t.getAttribute(r).toString().trim();""===e&&(e=n),e in i||(i[e]=[]),i[e].push(t.scrollTop)}));const c=s.querySelectorAll(`[${e}]`);if(c){const r=o.parseFromString(a[t],"text/html"),n=r.querySelectorAll(`[${e}]`);if(c.length!==n.length){console.error(`Liquid Ajax Cart: the received HTML for the "${t}" section has a different quantity of the "${e}" containers. The section will be updated completely.`);const a=r.querySelector(`#shopify-section-${t}`);a&&(s.innerHTML=a.innerHTML)}else c.forEach(((t,e)=>{t.before(n[e]),t.parentElement.removeChild(t)}))}for(let t in i)s.querySelectorAll(` [${r}="${t.replace(n,"")}"] `).forEach(((e,r)=>{r+1<=i[t].length&&(e.scrollTop=i[t][r])}))})):console.error(`Liquid Ajax Cart: the HTML for the "${t}" section was requested but the response is ${a[t]}`)}}))})),document.addEventListener("click",(function(t){for(var e=t.target;e&&e!=this;e=e.parentNode)w.call(e,t),E.call(e,t)}),!1),document.addEventListener("change",(function(t){v.call(t.target,t)}),!1),document.addEventListener("keydown",(function(t){const{quantityInputAttribute:e}=a.computed;"Enter"===t.key&&v.call(t.target,t),"Escape"===t.key&&_.call(t.target,t)}),!1),b((function(t){const{quantityInputAttribute:e}=a.computed;t.status.requestInProgress?document.querySelectorAll(`[${e}]`).forEach((t=>{t.readOnly=!0})):document.querySelectorAll(`[${e}]`).forEach((r=>{if(t.status.cartStateSet){const a=t.cart.items.find((t=>t.key===r.getAttribute(e).trim()));a&&(r.value=a.quantity)}r.readOnly=!1}))})),document.addEventListener("submit",(t=>{const e=t.target;let r;if("/cart/add"!==new URL(t.target.action).pathname)return;if("productFormsFilter"in a&&!a.productFormsFilter(e))return;if(t.preventDefault(),r=$.get(e),r>0||(r=0),r>0)return;const o=new FormData(e);$.set(e,r+1),T(e),u(o,{lastComplete:t=>{const r=$.get(e);r>0&&$.set(e,r-1),T(e)},info:{initiator:e}})})),m(((t,e)=>{const r={};r.add=B,r.change=R,t.requestType in r&&r[t.requestType](t,e)})),b(k),k(A()),window.liquidAjaxCart={configure:o,cartRequestGet:c,cartRequestAdd:u,cartRequestChange:d,cartRequestUpdate:l,cartRequestClear:p,subscribeToCartAjaxRequests:m,getCartState:A,subscribeToCartStateUpdate:b});const M=liquidAjaxCart.configure,F=liquidAjaxCart.cartRequestGet,P=liquidAjaxCart.cartRequestAdd,I=liquidAjaxCart.cartRequestChange,U=liquidAjaxCart.cartRequestUpdate,O=liquidAjaxCart.cartRequestClear,H=liquidAjaxCart.subscribeToCartAjaxRequests,N=liquidAjaxCart.getCartState,J=liquidAjaxCart.subscribeToCartStateUpdate;var Q=e.x$,G=e.nd,K=e.yF,W=e.fi,X=e.Be,Y=e.jQ,z=e.KJ,V=e.Q4,Z=e.w0;export{Q as cartRequestAdd,G as cartRequestChange,K as cartRequestClear,W as cartRequestGet,X as cartRequestUpdate,Y as configure,z as getCartState,V as subscribeToCartAjaxRequests,Z as subscribeToCartStateUpdate};