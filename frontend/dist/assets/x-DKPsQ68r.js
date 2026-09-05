import{r as t,j as k}from"./index-CCYRL6HU.js";import{M as I,u as j,P as S,o as b,f as A,L as T,b as M}from"./shield-check--pjeMNGQ.js";class q extends t.Component{getSnapshotBeforeUpdate(l){const e=this.props.childRef.current;if(e&&l.isPresent&&!this.props.isPresent){const n=this.props.sizeRef.current;n.height=e.offsetHeight||0,n.width=e.offsetWidth||0,n.top=e.offsetTop,n.left=e.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function N({children:i,isPresent:l}){const e=t.useId(),n=t.useRef(null),y=t.useRef({width:0,height:0,top:0,left:0}),{nonce:f}=t.useContext(I);return t.useInsertionEffect(()=>{const{width:d,height:o,top:h,left:s}=y.current;if(l||!n.current||!d||!o)return;n.current.dataset.motionPopId=e;const c=document.createElement("style");return f&&(c.nonce=f),document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`
          [data-motion-pop-id="${e}"] {
            position: absolute !important;
            width: ${d}px !important;
            height: ${o}px !important;
            top: ${h}px !important;
            left: ${s}px !important;
          }
        `),()=>{document.head.removeChild(c)}},[l]),k.jsx(q,{isPresent:l,childRef:n,sizeRef:y,children:t.cloneElement(i,{ref:n})})}const D=({children:i,initial:l,isPresent:e,onExitComplete:n,custom:y,presenceAffectsLayout:f,mode:d})=>{const o=j(H),h=t.useId(),s=t.useCallback(u=>{o.set(u,!0);for(const x of o.values())if(!x)return;n&&n()},[o,n]),c=t.useMemo(()=>({id:h,initial:l,isPresent:e,custom:y,onExitComplete:s,register:u=>(o.set(u,!1),()=>o.delete(u))}),f?[Math.random(),s]:[e,s]);return t.useMemo(()=>{o.forEach((u,x)=>o.set(x,!1))},[e]),t.useEffect(()=>{!e&&!o.size&&n&&n()},[e]),d==="popLayout"&&(i=k.jsx(N,{isPresent:e,children:i})),k.jsx(S.Provider,{value:c,children:i})};function H(){return new Map}const g=i=>i.key||"";function P(i){const l=[];return t.Children.forEach(i,e=>{t.isValidElement(e)&&l.push(e)}),l}const O=({children:i,custom:l,initial:e=!0,onExitComplete:n,presenceAffectsLayout:y=!0,mode:f="sync",propagate:d=!1})=>{const[o,h]=b(d),s=t.useMemo(()=>P(i),[i]),c=d&&!o?[]:s.map(g),u=t.useRef(!0),x=t.useRef(s),C=j(()=>new Map),[_,z]=t.useState(s),[p,w]=t.useState(s);A(()=>{u.current=!1,x.current=s;for(let a=0;a<p.length;a++){const r=g(p[a]);c.includes(r)?C.delete(r):C.get(r)!==!0&&C.set(r,!1)}},[p,c.length,c.join("-")]);const v=[];if(s!==_){let a=[...s];for(let r=0;r<p.length;r++){const m=p[r],E=g(m);c.includes(E)||(a.splice(r,0,m),v.push(m))}f==="wait"&&v.length&&(a=v),w(P(a)),z(s);return}const{forceRender:R}=t.useContext(T);return k.jsx(k.Fragment,{children:p.map(a=>{const r=g(a),m=d&&!o?!1:s===p||c.includes(r),E=()=>{if(C.has(r))C.set(r,!0);else return;let L=!0;C.forEach($=>{$||(L=!1)}),L&&(R==null||R(),w(x.current),d&&(h==null||h()),n&&n())};return k.jsx(D,{isPresent:m,initial:!u.current||e?void 0:!1,custom:m?void 0:l,presenceAffectsLayout:y,mode:f,onExitComplete:m?void 0:E,children:a},r)})})};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],V=M("Mail",K);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],W=M("Sparkles",U);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]],J=M("Terminal",X);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Q=M("X",B);export{O as A,V as M,W as S,J as T,Q as X};
