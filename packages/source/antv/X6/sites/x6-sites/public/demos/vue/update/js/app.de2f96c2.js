(function(e){function t(t){for(var r,a,s=t[0],p=t[1],u=t[2],l=0,d=[];l<s.length;l++)a=s[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in p)Object.prototype.hasOwnProperty.call(p,r)&&(e[r]=p[r]);i&&i(t);while(d.length)d.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,s=1;s<n.length;s++){var p=n[s];0!==o[p]&&(r=!1)}r&&(c.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={app:0},c=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],p=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var i=p;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},1495:function(e,t,n){"use strict";n("cf6a")},"2aa6":function(e,t,n){"use strict";n("a879")},a879:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),o=n("c3a1");const c={class:"app-content"},a=Object(r["createElementVNode"])("div",{id:"container"},null,-1);function s(e,t,n,o,s,p){const u=Object(r["resolveComponent"])("TeleportContainer");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",c,[a,Object(r["createVNode"])(u)])}const p={class:"percentage-value"};function u(e,t,n,o,c,a){const s=Object(r["resolveComponent"])("el-progress");return Object(r["openBlock"])(),Object(r["createBlock"])(s,{type:"dashboard",percentage:e.percentage,width:80},{default:Object(r["withCtx"])(({percentage:e})=>[Object(r["createElementVNode"])("span",p,Object(r["toDisplayString"])(e)+"%",1)]),_:1},8,["percentage"])}var i=Object(r["defineComponent"])({name:"ProgressNode",inject:["getNode"],data(){return{percentage:80}},mounted(){const e=this.getNode();e.on("change:data",({current:e})=>{const{progress:t}=e;this.percentage=t})}}),l=(n("1495"),n("6b0d")),d=n.n(l);const f=d()(i,[["render",u],["__scopeId","data-v-32b49dba"]]);var b=f,g=n("5728"),v=n("3e2f");Object(v["b"])({shape:"custom-vue-node",width:100,height:100,component:b});const h=Object(v["a"])();var O=Object(r["defineComponent"])({name:"App",components:{TeleportContainer:h},mounted(){const e=new g["a"]({container:document.getElementById("container"),background:{color:"#F2F7FA"}}),t=e.addNode({shape:"custom-vue-node",x:100,y:60,data:{progress:80}});e.centerContent(),setInterval(()=>{const{progress:e}=t.getData();t.setData({progress:(e+10)%100})},2e3)}});n("2aa6");const j=d()(O,[["render",s]]);var m=j;n("7437");Object(r["createApp"])(m).use(o["a"]).mount("#app")},cf6a:function(e,t,n){}});
//# sourceMappingURL=app.de2f96c2.js.map