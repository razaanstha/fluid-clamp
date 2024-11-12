"use strict";var k=Object.create;var c=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var U=Object.getOwnPropertyNames,S=Object.getOwnPropertySymbols,j=Object.getPrototypeOf,z=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var P=(t,n,e)=>n in t?c(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,$=(t,n)=>{for(var e in n||(n={}))z.call(n,e)&&P(t,e,n[e]);if(S)for(var e of S(n))B.call(n,e)&&P(t,e,n[e]);return t};var G=(t,n)=>{for(var e in n)c(t,e,{get:n[e],enumerable:!0})},V=(t,n,e,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of U(n))!z.call(t,s)&&s!==e&&c(t,s,{get:()=>n[s],enumerable:!(r=E(n,s))||r.enumerable});return t};var H=(t,n,e)=>(e=t!=null?k(j(t)):{},V(n||!t||!t.__esModule?c(e,"default",{value:t,enumerable:!0}):e,t)),J=t=>V(c({},"__esModule",{value:!0}),t);var L={};G(L,{default:()=>K});module.exports=J(L);var D=H(require("postcss-value-parser"));var h=(t={})=>{let n=$({warnings:!1},t);return{postcssPlugin:"fluid-clamp",Declaration(e,{result:r}){let s=(0,D.default)(e.value),p=!1;s.walk(d=>{if(d.type!=="function"||d.value!=="clamp")return;let u=d.nodes.filter(a=>a.type!=="div");if(u.length!==3)return;let v=u.findIndex(a=>a.type==="function"&&a.value==="@fluid");if(v===-1)return;let o=u[v],i=[],w=!1;if(o.nodes.forEach(a=>{if(a.type==="word"){let x=parseFloat(a.value);!isNaN(x)&&x.toString()===a.value?i.push(x):w=!0}}),w){n.warnings&&e.warn(r,"@fluid function contains invalid numerical arguments.");return}if(![0,2,3].includes(i.length)){n.warnings&&e.warn(r,`@fluid function requires either 0, 2, or 3 numerical arguments, but received ${i.length}.`);return}if((i.length===2||i.length===3)&&i.some(a=>typeof a!="number"||isNaN(a))){n.warnings&&e.warn(r,"@fluid function contains invalid numerical arguments.");return}let l=768,f=1536,m=16;i.length===2?(l=i[0],f=i[1]):i.length===3&&(l=i[0],f=i[1],m=i[2]);let A=u[0],I=u[2],g=b(A.value),F=b(I.value);if(g===null||F===null)return;let q=F-g,N=f-l;if(N===0){let a=`${m}px`;o.type="word",o.value=a,delete o.nodes,n.warnings&&e.warn(r,`minScreen (${l}px) and maxScreen (${f}px) are equal. Using minSize (${m}px).`),p=!0;return}let y=q/N,C=g-y*l,R=parseFloat((y*100).toFixed(5)),W=`calc(${parseFloat(C.toFixed(5))}px + ${R}vw)`;o.type="word",o.value=W,delete o.nodes,p=!0}),p&&(e.value=s.toString())}}};function b(t){let n=/^([\d.]+)(px|rem|em)$/,e=t.trim().match(n);if(!e)return null;let r=parseFloat(e[1]);switch(e[2]){case"px":return r;case"rem":case"em":return r*16;default:return null}}h.postcss=!0;h.postcssPlugin="fluid-clamp";var K=h;
//# sourceMappingURL=index.js.map