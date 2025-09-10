import{u as w,g as p,j as a,a as C,n as c,k as N,l as f}from"./index-B19b3JkR.js";import{b as l}from"./vendor-Bj2_SvGi.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),b=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,t,r)=>r?r.toUpperCase():t.toLowerCase()),d=e=>{const s=b(e);return s.charAt(0).toUpperCase()+s.slice(1)},h=(...e)=>e.filter((s,t,r)=>!!s&&s.trim()!==""&&r.indexOf(s)===t).join(" ").trim(),y=e=>{for(const s in e)if(s.startsWith("aria-")||s==="role"||s==="title")return!0};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=l.forwardRef(({color:e="currentColor",size:s=24,strokeWidth:t=2,absoluteStrokeWidth:r,className:i="",children:n,iconNode:o,...m},x)=>l.createElement("svg",{ref:x,...k,width:s,height:s,stroke:e,strokeWidth:r?Number(t)*24/Number(s):t,className:h("lucide",i),...!n&&!y(m)&&{"aria-hidden":"true"},...m},[...o.map(([g,j])=>l.createElement(g,j)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=(e,s)=>{const t=l.forwardRef(({className:r,...i},n)=>l.createElement(A,{ref:n,iconNode:s,className:h(`lucide-${v(d(e))}`,`lucide-${e}`,r),...i}));return t.displayName=d(e),t};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],L=u("heart",$);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],E=u("star",W);function T({product:e}){const s=w(),{wishlistItems:t}=p(o=>o.wishlist),r=t.some(o=>o.id===e.id),i=()=>{s(C({...e,quantity:1})),c.success(`${e.name} was added to cart`)},n=()=>{r?(s(N(e)),c.error(`${e.name} removed from wishlist`)):(s(f(e)),c.success(`${e.name} added to wishlist`))};return a.jsxs("div",{className:"menu-card",children:[a.jsxs("div",{className:"image-wrapper",children:[a.jsx("img",{src:e.image||"/placeholder.png",alt:e.name,className:"menu-image"}),a.jsx("div",{className:"category-badge",children:e.category}),a.jsx("button",{className:"wishlist-btn",onClick:n,children:a.jsx(L,{className:`heart-icon ${r?"wishlist-active":""}`})})]}),a.jsxs("div",{className:"menu-content",children:[a.jsxs("div",{className:"menu-header justify-content-between",children:[a.jsx("h3",{className:"title menu-title",children:e.name}),a.jsxs("div",{className:"menu-rating",children:[a.jsx(E,{className:"star-icon"}),a.jsx("span",{children:e.rating})]})]}),a.jsx("p",{className:"menu-desc desc-scroll",children:e.description}),a.jsxs("div",{className:"menu-footer",children:[a.jsxs("span",{className:"menu-price",children:["$",e.price.toFixed(2)]}),a.jsx("button",{className:"my-btn my-btn-primary",onClick:i,children:"Add to Cart"})]})]})]})}export{T as M};
