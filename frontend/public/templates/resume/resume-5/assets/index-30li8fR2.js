(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();var cr={exports:{}},Ni={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ym=Symbol.for("react.transitional.element"),bm=Symbol.for("react.fragment");function sr(e,t,a){var l=null;if(a!==void 0&&(l=""+a),t.key!==void 0&&(l=""+t.key),"key"in t){a={};for(var n in t)n!=="key"&&(a[n]=t[n])}else a=t;return t=a.ref,{$$typeof:ym,type:e,key:l,ref:t!==void 0?t:null,props:a}}Ni.Fragment=bm;Ni.jsx=sr;Ni.jsxs=sr;cr.exports=Ni;var c=cr.exports,ur={exports:{}},T={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zs=Symbol.for("react.transitional.element"),Nm=Symbol.for("react.portal"),jm=Symbol.for("react.fragment"),Sm=Symbol.for("react.strict_mode"),zm=Symbol.for("react.profiler"),Em=Symbol.for("react.consumer"),Am=Symbol.for("react.context"),Tm=Symbol.for("react.forward_ref"),Mm=Symbol.for("react.suspense"),Om=Symbol.for("react.memo"),or=Symbol.for("react.lazy"),Cm=Symbol.for("react.activity"),Ou=Symbol.iterator;function Dm(e){return e===null||typeof e!="object"?null:(e=Ou&&e[Ou]||e["@@iterator"],typeof e=="function"?e:null)}var rr={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},fr=Object.assign,dr={};function nl(e,t,a){this.props=e,this.context=t,this.refs=dr,this.updater=a||rr}nl.prototype.isReactComponent={};nl.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};nl.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function mr(){}mr.prototype=nl.prototype;function Es(e,t,a){this.props=e,this.context=t,this.refs=dr,this.updater=a||rr}var As=Es.prototype=new mr;As.constructor=Es;fr(As,nl.prototype);As.isPureReactComponent=!0;var Cu=Array.isArray;function Ac(){}var I={H:null,A:null,T:null,S:null},pr=Object.prototype.hasOwnProperty;function Ts(e,t,a){var l=a.ref;return{$$typeof:zs,type:e,key:t,ref:l!==void 0?l:null,props:a}}function _m(e,t){return Ts(e.type,t,e.props)}function Ms(e){return typeof e=="object"&&e!==null&&e.$$typeof===zs}function Rm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(a){return t[a]})}var Du=/\/+/g;function Gi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Rm(""+e.key):t.toString(36)}function Um(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Ac,Ac):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Ea(e,t,a,l,n){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(i){case"bigint":case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case zs:case Nm:s=!0;break;case or:return s=e._init,Ea(s(e._payload),t,a,l,n)}}if(s)return n=n(e),s=l===""?"."+Gi(e,0):l,Cu(n)?(a="",s!=null&&(a=s.replace(Du,"$&/")+"/"),Ea(n,t,a,"",function(d){return d})):n!=null&&(Ms(n)&&(n=_m(n,a+(n.key==null||e&&e.key===n.key?"":(""+n.key).replace(Du,"$&/")+"/")+s)),t.push(n)),1;s=0;var u=l===""?".":l+":";if(Cu(e))for(var o=0;o<e.length;o++)l=e[o],i=u+Gi(l,o),s+=Ea(l,t,a,i,n);else if(o=Dm(e),typeof o=="function")for(e=o.call(e),o=0;!(l=e.next()).done;)l=l.value,i=u+Gi(l,o++),s+=Ea(l,t,a,i,n);else if(i==="object"){if(typeof e.then=="function")return Ea(Um(e),t,a,l,n);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return s}function pn(e,t,a){if(e==null)return e;var l=[],n=0;return Ea(e,l,"","",function(i){return t.call(a,i,n++)}),l}function Hm(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(a){(e._status===0||e._status===-1)&&(e._status=1,e._result=a)},function(a){(e._status===0||e._status===-1)&&(e._status=2,e._result=a)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var _u=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},wm={map:pn,forEach:function(e,t,a){pn(e,function(){t.apply(this,arguments)},a)},count:function(e){var t=0;return pn(e,function(){t++}),t},toArray:function(e){return pn(e,function(t){return t})||[]},only:function(e){if(!Ms(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};T.Activity=Cm;T.Children=wm;T.Component=nl;T.Fragment=jm;T.Profiler=zm;T.PureComponent=Es;T.StrictMode=Sm;T.Suspense=Mm;T.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I;T.__COMPILER_RUNTIME={__proto__:null,c:function(e){return I.H.useMemoCache(e)}};T.cache=function(e){return function(){return e.apply(null,arguments)}};T.cacheSignal=function(){return null};T.cloneElement=function(e,t,a){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var l=fr({},e.props),n=e.key;if(t!=null)for(i in t.key!==void 0&&(n=""+t.key),t)!pr.call(t,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&t.ref===void 0||(l[i]=t[i]);var i=arguments.length-2;if(i===1)l.children=a;else if(1<i){for(var s=Array(i),u=0;u<i;u++)s[u]=arguments[u+2];l.children=s}return Ts(e.type,n,l)};T.createContext=function(e){return e={$$typeof:Am,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Em,_context:e},e};T.createElement=function(e,t,a){var l,n={},i=null;if(t!=null)for(l in t.key!==void 0&&(i=""+t.key),t)pr.call(t,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(n[l]=t[l]);var s=arguments.length-2;if(s===1)n.children=a;else if(1<s){for(var u=Array(s),o=0;o<s;o++)u[o]=arguments[o+2];n.children=u}if(e&&e.defaultProps)for(l in s=e.defaultProps,s)n[l]===void 0&&(n[l]=s[l]);return Ts(e,i,n)};T.createRef=function(){return{current:null}};T.forwardRef=function(e){return{$$typeof:Tm,render:e}};T.isValidElement=Ms;T.lazy=function(e){return{$$typeof:or,_payload:{_status:-1,_result:e},_init:Hm}};T.memo=function(e,t){return{$$typeof:Om,type:e,compare:t===void 0?null:t}};T.startTransition=function(e){var t=I.T,a={};I.T=a;try{var l=e(),n=I.S;n!==null&&n(a,l),typeof l=="object"&&l!==null&&typeof l.then=="function"&&l.then(Ac,_u)}catch(i){_u(i)}finally{t!==null&&a.types!==null&&(t.types=a.types),I.T=t}};T.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()};T.use=function(e){return I.H.use(e)};T.useActionState=function(e,t,a){return I.H.useActionState(e,t,a)};T.useCallback=function(e,t){return I.H.useCallback(e,t)};T.useContext=function(e){return I.H.useContext(e)};T.useDebugValue=function(){};T.useDeferredValue=function(e,t){return I.H.useDeferredValue(e,t)};T.useEffect=function(e,t){return I.H.useEffect(e,t)};T.useEffectEvent=function(e){return I.H.useEffectEvent(e)};T.useId=function(){return I.H.useId()};T.useImperativeHandle=function(e,t,a){return I.H.useImperativeHandle(e,t,a)};T.useInsertionEffect=function(e,t){return I.H.useInsertionEffect(e,t)};T.useLayoutEffect=function(e,t){return I.H.useLayoutEffect(e,t)};T.useMemo=function(e,t){return I.H.useMemo(e,t)};T.useOptimistic=function(e,t){return I.H.useOptimistic(e,t)};T.useReducer=function(e,t,a){return I.H.useReducer(e,t,a)};T.useRef=function(e){return I.H.useRef(e)};T.useState=function(e){return I.H.useState(e)};T.useSyncExternalStore=function(e,t,a){return I.H.useSyncExternalStore(e,t,a)};T.useTransition=function(){return I.H.useTransition()};T.version="19.2.8";ur.exports=T;var J=ur.exports,hr={exports:{}},ji={},gr={exports:{}},vr={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(j,_){var D=j.length;j.push(_);e:for(;0<D;){var le=D-1>>>1,de=j[le];if(0<n(de,_))j[le]=_,j[D]=de,D=le;else break e}}function a(j){return j.length===0?null:j[0]}function l(j){if(j.length===0)return null;var _=j[0],D=j.pop();if(D!==_){j[0]=D;e:for(var le=0,de=j.length,fn=de>>>1;le<fn;){var dn=2*(le+1)-1,Li=j[dn],ea=dn+1,mn=j[ea];if(0>n(Li,D))ea<de&&0>n(mn,Li)?(j[le]=mn,j[ea]=D,le=ea):(j[le]=Li,j[dn]=D,le=dn);else if(ea<de&&0>n(mn,D))j[le]=mn,j[ea]=D,le=ea;else break e}}return _}function n(j,_){var D=j.sortIndex-_.sortIndex;return D!==0?D:j.id-_.id}if(e.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var s=Date,u=s.now();e.unstable_now=function(){return s.now()-u}}var o=[],d=[],g=1,v=null,f=3,h=!1,b=!1,S=!1,H=!1,m=typeof setTimeout=="function"?setTimeout:null,r=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;function x(j){for(var _=a(d);_!==null;){if(_.callback===null)l(d);else if(_.startTime<=j)l(d),_.sortIndex=_.expirationTime,t(o,_);else break;_=a(d)}}function z(j){if(S=!1,x(j),!b)if(a(o)!==null)b=!0,O||(O=!0,At());else{var _=a(d);_!==null&&qi(z,_.startTime-j)}}var O=!1,N=-1,A=5,C=-1;function B(){return H?!0:!(e.unstable_now()-C<A)}function Le(){if(H=!1,O){var j=e.unstable_now();C=j;var _=!0;try{e:{b=!1,S&&(S=!1,r(N),N=-1),h=!0;var D=f;try{t:{for(x(j),v=a(o);v!==null&&!(v.expirationTime>j&&B());){var le=v.callback;if(typeof le=="function"){v.callback=null,f=v.priorityLevel;var de=le(v.expirationTime<=j);if(j=e.unstable_now(),typeof de=="function"){v.callback=de,x(j),_=!0;break t}v===a(o)&&l(o),x(j)}else l(o);v=a(o)}if(v!==null)_=!0;else{var fn=a(d);fn!==null&&qi(z,fn.startTime-j),_=!1}}break e}finally{v=null,f=D,h=!1}_=void 0}}finally{_?At():O=!1}}}var At;if(typeof p=="function")At=function(){p(Le)};else if(typeof MessageChannel<"u"){var Mu=new MessageChannel,xm=Mu.port2;Mu.port1.onmessage=Le,At=function(){xm.postMessage(null)}}else At=function(){m(Le,0)};function qi(j,_){N=m(function(){j(e.unstable_now())},_)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(j){j.callback=null},e.unstable_forceFrameRate=function(j){0>j||125<j?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<j?Math.floor(1e3/j):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(j){switch(f){case 1:case 2:case 3:var _=3;break;default:_=f}var D=f;f=_;try{return j()}finally{f=D}},e.unstable_requestPaint=function(){H=!0},e.unstable_runWithPriority=function(j,_){switch(j){case 1:case 2:case 3:case 4:case 5:break;default:j=3}var D=f;f=j;try{return _()}finally{f=D}},e.unstable_scheduleCallback=function(j,_,D){var le=e.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?le+D:le):D=le,j){case 1:var de=-1;break;case 2:de=250;break;case 5:de=1073741823;break;case 4:de=1e4;break;default:de=5e3}return de=D+de,j={id:g++,callback:_,priorityLevel:j,startTime:D,expirationTime:de,sortIndex:-1},D>le?(j.sortIndex=D,t(d,j),a(o)===null&&j===a(d)&&(S?(r(N),N=-1):S=!0,qi(z,D-le))):(j.sortIndex=de,t(o,j),b||h||(b=!0,O||(O=!0,At()))),j},e.unstable_shouldYield=B,e.unstable_wrapCallback=function(j){var _=f;return function(){var D=f;f=_;try{return j.apply(this,arguments)}finally{f=D}}}})(vr);gr.exports=vr;var Bm=gr.exports,xr={exports:{}},Se={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var km=J;function yr(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Tt(){}var je={d:{f:Tt,r:function(){throw Error(yr(522))},D:Tt,C:Tt,L:Tt,m:Tt,X:Tt,S:Tt,M:Tt},p:0,findDOMNode:null},Ym=Symbol.for("react.portal");function qm(e,t,a){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ym,key:l==null?null:""+l,children:e,containerInfo:t,implementation:a}}var zl=km.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Si(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}Se.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=je;Se.createPortal=function(e,t){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(yr(299));return qm(e,t,null,a)};Se.flushSync=function(e){var t=zl.T,a=je.p;try{if(zl.T=null,je.p=2,e)return e()}finally{zl.T=t,je.p=a,je.d.f()}};Se.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,je.d.C(e,t))};Se.prefetchDNS=function(e){typeof e=="string"&&je.d.D(e)};Se.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var a=t.as,l=Si(a,t.crossOrigin),n=typeof t.integrity=="string"?t.integrity:void 0,i=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;a==="style"?je.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:l,integrity:n,fetchPriority:i}):a==="script"&&je.d.X(e,{crossOrigin:l,integrity:n,fetchPriority:i,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};Se.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var a=Si(t.as,t.crossOrigin);je.d.M(e,{crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&je.d.M(e)};Se.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var a=t.as,l=Si(a,t.crossOrigin);je.d.L(e,a,{crossOrigin:l,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};Se.preloadModule=function(e,t){if(typeof e=="string")if(t){var a=Si(t.as,t.crossOrigin);je.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else je.d.m(e)};Se.requestFormReset=function(e){je.d.r(e)};Se.unstable_batchedUpdates=function(e,t){return e(t)};Se.useFormState=function(e,t,a){return zl.H.useFormState(e,t,a)};Se.useFormStatus=function(){return zl.H.useHostTransitionStatus()};Se.version="19.2.8";function br(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(br)}catch(e){console.error(e)}}br(),xr.exports=Se;var Lm=xr.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fe=Bm,Nr=J,Gm=Lm;function y(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function jr(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Il(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function Sr(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function zr(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ru(e){if(Il(e)!==e)throw Error(y(188))}function Xm(e){var t=e.alternate;if(!t){if(t=Il(e),t===null)throw Error(y(188));return t!==e?null:e}for(var a=e,l=t;;){var n=a.return;if(n===null)break;var i=n.alternate;if(i===null){if(l=n.return,l!==null){a=l;continue}break}if(n.child===i.child){for(i=n.child;i;){if(i===a)return Ru(n),e;if(i===l)return Ru(n),t;i=i.sibling}throw Error(y(188))}if(a.return!==l.return)a=n,l=i;else{for(var s=!1,u=n.child;u;){if(u===a){s=!0,a=n,l=i;break}if(u===l){s=!0,l=n,a=i;break}u=u.sibling}if(!s){for(u=i.child;u;){if(u===a){s=!0,a=i,l=n;break}if(u===l){s=!0,l=i,a=n;break}u=u.sibling}if(!s)throw Error(y(189))}}if(a.alternate!==l)throw Error(y(190))}if(a.tag!==3)throw Error(y(188));return a.stateNode.current===a?e:t}function Er(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Er(e),t!==null)return t;e=e.sibling}return null}var P=Object.assign,Qm=Symbol.for("react.element"),hn=Symbol.for("react.transitional.element"),yl=Symbol.for("react.portal"),Ma=Symbol.for("react.fragment"),Ar=Symbol.for("react.strict_mode"),Tc=Symbol.for("react.profiler"),Tr=Symbol.for("react.consumer"),pt=Symbol.for("react.context"),Os=Symbol.for("react.forward_ref"),Mc=Symbol.for("react.suspense"),Oc=Symbol.for("react.suspense_list"),Cs=Symbol.for("react.memo"),Mt=Symbol.for("react.lazy"),Cc=Symbol.for("react.activity"),Vm=Symbol.for("react.memo_cache_sentinel"),Uu=Symbol.iterator;function dl(e){return e===null||typeof e!="object"?null:(e=Uu&&e[Uu]||e["@@iterator"],typeof e=="function"?e:null)}var Zm=Symbol.for("react.client.reference");function Dc(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Zm?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ma:return"Fragment";case Tc:return"Profiler";case Ar:return"StrictMode";case Mc:return"Suspense";case Oc:return"SuspenseList";case Cc:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case yl:return"Portal";case pt:return e.displayName||"Context";case Tr:return(e._context.displayName||"Context")+".Consumer";case Os:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Cs:return t=e.displayName||null,t!==null?t:Dc(e.type)||"Memo";case Mt:t=e._payload,e=e._init;try{return Dc(e(t))}catch{}}return null}var bl=Array.isArray,E=Nr.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L=Gm.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ca={pending:!1,data:null,method:null,action:null},_c=[],Oa=-1;function it(e){return{current:e}}function he(e){0>Oa||(e.current=_c[Oa],_c[Oa]=null,Oa--)}function $(e,t){Oa++,_c[Oa]=e.current,e.current=t}var nt=it(null),kl=it(null),Yt=it(null),Vn=it(null);function Zn(e,t){switch($(Yt,t),$(kl,e),$(nt,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Lo(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Lo(t),e=Jd(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}he(nt),$(nt,e)}function Ka(){he(nt),he(kl),he(Yt)}function Rc(e){e.memoizedState!==null&&$(Vn,e);var t=nt.current,a=Jd(t,e.type);t!==a&&($(kl,e),$(nt,a))}function Kn(e){kl.current===e&&(he(nt),he(kl)),Vn.current===e&&(he(Vn),$l._currentValue=ca)}var Xi,Hu;function aa(e){if(Xi===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Xi=t&&t[1]||"",Hu=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Xi+e+Hu}var Qi=!1;function Vi(e,t){if(!e||Qi)return"";Qi=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(t){var v=function(){throw Error()};if(Object.defineProperty(v.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(v,[])}catch(h){var f=h}Reflect.construct(e,[],v)}else{try{v.call()}catch(h){f=h}e.call(v.prototype)}}else{try{throw Error()}catch(h){f=h}(v=e())&&typeof v.catch=="function"&&v.catch(function(){})}}catch(h){if(h&&f&&typeof h.stack=="string")return[h.stack,f.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),s=i[0],u=i[1];if(s&&u){var o=s.split(`
`),d=u.split(`
`);for(n=l=0;l<o.length&&!o[l].includes("DetermineComponentFrameRoot");)l++;for(;n<d.length&&!d[n].includes("DetermineComponentFrameRoot");)n++;if(l===o.length||n===d.length)for(l=o.length-1,n=d.length-1;1<=l&&0<=n&&o[l]!==d[n];)n--;for(;1<=l&&0<=n;l--,n--)if(o[l]!==d[n]){if(l!==1||n!==1)do if(l--,n--,0>n||o[l]!==d[n]){var g=`
`+o[l].replace(" at new "," at ");return e.displayName&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",e.displayName)),g}while(1<=l&&0<=n);break}}}finally{Qi=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?aa(a):""}function Km(e,t){switch(e.tag){case 26:case 27:case 5:return aa(e.type);case 16:return aa("Lazy");case 13:return e.child!==t&&t!==null?aa("Suspense Fallback"):aa("Suspense");case 19:return aa("SuspenseList");case 0:case 15:return Vi(e.type,!1);case 11:return Vi(e.type.render,!1);case 1:return Vi(e.type,!0);case 31:return aa("Activity");default:return""}}function wu(e){try{var t="",a=null;do t+=Km(e,a),a=e,e=e.return;while(e);return t}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var Uc=Object.prototype.hasOwnProperty,Ds=fe.unstable_scheduleCallback,Zi=fe.unstable_cancelCallback,Jm=fe.unstable_shouldYield,$m=fe.unstable_requestPaint,He=fe.unstable_now,Wm=fe.unstable_getCurrentPriorityLevel,Mr=fe.unstable_ImmediatePriority,Or=fe.unstable_UserBlockingPriority,Jn=fe.unstable_NormalPriority,Fm=fe.unstable_LowPriority,Cr=fe.unstable_IdlePriority,Im=fe.log,Pm=fe.unstable_setDisableYieldValue,Pl=null,we=null;function Ut(e){if(typeof Im=="function"&&Pm(e),we&&typeof we.setStrictMode=="function")try{we.setStrictMode(Pl,e)}catch{}}var Be=Math.clz32?Math.clz32:ap,ep=Math.log,tp=Math.LN2;function ap(e){return e>>>=0,e===0?32:31-(ep(e)/tp|0)|0}var gn=256,vn=262144,xn=4194304;function la(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function zi(e,t,a){var l=e.pendingLanes;if(l===0)return 0;var n=0,i=e.suspendedLanes,s=e.pingedLanes;e=e.warmLanes;var u=l&134217727;return u!==0?(l=u&~i,l!==0?n=la(l):(s&=u,s!==0?n=la(s):a||(a=u&~e,a!==0&&(n=la(a))))):(u=l&~i,u!==0?n=la(u):s!==0?n=la(s):a||(a=l&~e,a!==0&&(n=la(a)))),n===0?0:t!==0&&t!==n&&!(t&i)&&(i=n&-n,a=t&-t,i>=a||i===32&&(a&4194048)!==0)?t:n}function en(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function lp(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Dr(){var e=xn;return xn<<=1,!(xn&62914560)&&(xn=4194304),e}function Ki(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function tn(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function np(e,t,a,l,n,i){var s=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var u=e.entanglements,o=e.expirationTimes,d=e.hiddenUpdates;for(a=s&~a;0<a;){var g=31-Be(a),v=1<<g;u[g]=0,o[g]=-1;var f=d[g];if(f!==null)for(d[g]=null,g=0;g<f.length;g++){var h=f[g];h!==null&&(h.lane&=-536870913)}a&=~v}l!==0&&_r(e,l,0),i!==0&&n===0&&e.tag!==0&&(e.suspendedLanes|=i&~(s&~t))}function _r(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var l=31-Be(t);e.entangledLanes|=t,e.entanglements[l]=e.entanglements[l]|1073741824|a&261930}function Rr(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var l=31-Be(a),n=1<<l;n&t|e[l]&t&&(e[l]|=t),a&=~n}}function Ur(e,t){var a=t&-t;return a=a&42?1:_s(a),a&(e.suspendedLanes|t)?0:a}function _s(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Rs(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Hr(){var e=L.p;return e!==0?e:(e=window.event,e===void 0?32:im(e.type))}function Bu(e,t){var a=L.p;try{return L.p=e,t()}finally{L.p=a}}var It=Math.random().toString(36).slice(2),ve="__reactFiber$"+It,Oe="__reactProps$"+It,il="__reactContainer$"+It,Hc="__reactEvents$"+It,ip="__reactListeners$"+It,cp="__reactHandles$"+It,ku="__reactResources$"+It,an="__reactMarker$"+It;function Us(e){delete e[ve],delete e[Oe],delete e[Hc],delete e[ip],delete e[cp]}function Ca(e){var t=e[ve];if(t)return t;for(var a=e.parentNode;a;){if(t=a[il]||a[ve]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Zo(e);e!==null;){if(a=e[ve])return a;e=Zo(e)}return t}e=a,a=e.parentNode}return null}function cl(e){if(e=e[ve]||e[il]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Nl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(y(33))}function qa(e){var t=e[ku];return t||(t=e[ku]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function pe(e){e[an]=!0}var wr=new Set,Br={};function ga(e,t){Ja(e,t),Ja(e+"Capture",t)}function Ja(e,t){for(Br[e]=t,e=0;e<t.length;e++)wr.add(t[e])}var sp=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Yu={},qu={};function up(e){return Uc.call(qu,e)?!0:Uc.call(Yu,e)?!1:sp.test(e)?qu[e]=!0:(Yu[e]=!0,!1)}function Cn(e,t,a){if(up(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var l=t.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function yn(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function st(e,t,a,l){if(l===null)e.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+l)}}function Xe(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function kr(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function op(e,t,a){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var n=l.get,i=l.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return n.call(this)},set:function(s){a=""+s,i.call(this,s)}}),Object.defineProperty(e,t,{enumerable:l.enumerable}),{getValue:function(){return a},setValue:function(s){a=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function wc(e){if(!e._valueTracker){var t=kr(e)?"checked":"value";e._valueTracker=op(e,t,""+e[t])}}function Yr(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),l="";return e&&(l=kr(e)?e.checked?"true":"false":e.value),e=l,e!==a?(t.setValue(e),!0):!1}function $n(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var rp=/[\n"\\]/g;function Ze(e){return e.replace(rp,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Bc(e,t,a,l,n,i,s,u){e.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?e.type=s:e.removeAttribute("type"),t!=null?s==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Xe(t)):e.value!==""+Xe(t)&&(e.value=""+Xe(t)):s!=="submit"&&s!=="reset"||e.removeAttribute("value"),t!=null?kc(e,s,Xe(t)):a!=null?kc(e,s,Xe(a)):l!=null&&e.removeAttribute("value"),n==null&&i!=null&&(e.defaultChecked=!!i),n!=null&&(e.checked=n&&typeof n!="function"&&typeof n!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.name=""+Xe(u):e.removeAttribute("name")}function qr(e,t,a,l,n,i,s,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||a!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){wc(e);return}a=a!=null?""+Xe(a):"",t=t!=null?""+Xe(t):a,u||t===e.value||(e.value=t),e.defaultValue=t}l=l??n,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=u?e.checked:!!l,e.defaultChecked=!!l,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.name=s),wc(e)}function kc(e,t,a){t==="number"&&$n(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function La(e,t,a,l){if(e=e.options,t){t={};for(var n=0;n<a.length;n++)t["$"+a[n]]=!0;for(a=0;a<e.length;a++)n=t.hasOwnProperty("$"+e[a].value),e[a].selected!==n&&(e[a].selected=n),n&&l&&(e[a].defaultSelected=!0)}else{for(a=""+Xe(a),t=null,n=0;n<e.length;n++){if(e[n].value===a){e[n].selected=!0,l&&(e[n].defaultSelected=!0);return}t!==null||e[n].disabled||(t=e[n])}t!==null&&(t.selected=!0)}}function Lr(e,t,a){if(t!=null&&(t=""+Xe(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+Xe(a):""}function Gr(e,t,a,l){if(t==null){if(l!=null){if(a!=null)throw Error(y(92));if(bl(l)){if(1<l.length)throw Error(y(93));l=l[0]}a=l}a==null&&(a=""),t=a}a=Xe(t),e.defaultValue=a,l=e.textContent,l===a&&l!==""&&l!==null&&(e.value=l),wc(e)}function $a(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var fp=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Lu(e,t,a){var l=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":l?e.setProperty(t,a):typeof a!="number"||a===0||fp.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function Xr(e,t,a){if(t!=null&&typeof t!="object")throw Error(y(62));if(e=e.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||t!=null&&t.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var n in t)l=t[n],t.hasOwnProperty(n)&&a[n]!==l&&Lu(e,n,l)}else for(var i in t)t.hasOwnProperty(i)&&Lu(e,i,t[i])}function Hs(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var dp=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),mp=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Dn(e){return mp.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ht(){}var Yc=null;function ws(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Da=null,Ga=null;function Gu(e){var t=cl(e);if(t&&(e=t.stateNode)){var a=e[Oe]||null;e:switch(e=t.stateNode,t.type){case"input":if(Bc(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Ze(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var l=a[t];if(l!==e&&l.form===e.form){var n=l[Oe]||null;if(!n)throw Error(y(90));Bc(l,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(t=0;t<a.length;t++)l=a[t],l.form===e.form&&Yr(l)}break e;case"textarea":Lr(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&La(e,!!a.multiple,t,!1)}}}var Ji=!1;function Qr(e,t,a){if(Ji)return e(t,a);Ji=!0;try{var l=e(t);return l}finally{if(Ji=!1,(Da!==null||Ga!==null)&&(wi(),Da&&(t=Da,e=Ga,Ga=Da=null,Gu(t),e)))for(t=0;t<e.length;t++)Gu(e[t])}}function Yl(e,t){var a=e.stateNode;if(a===null)return null;var l=a[Oe]||null;if(l===null)return null;a=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(y(231,t,typeof a));return a}var bt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qc=!1;if(bt)try{var ml={};Object.defineProperty(ml,"passive",{get:function(){qc=!0}}),window.addEventListener("test",ml,ml),window.removeEventListener("test",ml,ml)}catch{qc=!1}var Ht=null,Bs=null,_n=null;function Vr(){if(_n)return _n;var e,t=Bs,a=t.length,l,n="value"in Ht?Ht.value:Ht.textContent,i=n.length;for(e=0;e<a&&t[e]===n[e];e++);var s=a-e;for(l=1;l<=s&&t[a-l]===n[i-l];l++);return _n=n.slice(e,1<l?1-l:void 0)}function Rn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function bn(){return!0}function Xu(){return!1}function Ce(e){function t(a,l,n,i,s){this._reactName=a,this._targetInst=n,this.type=l,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(a=e[u],this[u]=a?a(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?bn:Xu,this.isPropagationStopped=Xu,this}return P(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=bn)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=bn)},persist:function(){},isPersistent:bn}),t}var va={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ei=Ce(va),ln=P({},va,{view:0,detail:0}),pp=Ce(ln),$i,Wi,pl,Ai=P({},ln,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ks,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==pl&&(pl&&e.type==="mousemove"?($i=e.screenX-pl.screenX,Wi=e.screenY-pl.screenY):Wi=$i=0,pl=e),$i)},movementY:function(e){return"movementY"in e?e.movementY:Wi}}),Qu=Ce(Ai),hp=P({},Ai,{dataTransfer:0}),gp=Ce(hp),vp=P({},ln,{relatedTarget:0}),Fi=Ce(vp),xp=P({},va,{animationName:0,elapsedTime:0,pseudoElement:0}),yp=Ce(xp),bp=P({},va,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Np=Ce(bp),jp=P({},va,{data:0}),Vu=Ce(jp),Sp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},zp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ep={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ap(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ep[e])?!!t[e]:!1}function ks(){return Ap}var Tp=P({},ln,{key:function(e){if(e.key){var t=Sp[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Rn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?zp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ks,charCode:function(e){return e.type==="keypress"?Rn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Rn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Mp=Ce(Tp),Op=P({},Ai,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Zu=Ce(Op),Cp=P({},ln,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ks}),Dp=Ce(Cp),_p=P({},va,{propertyName:0,elapsedTime:0,pseudoElement:0}),Rp=Ce(_p),Up=P({},Ai,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Hp=Ce(Up),wp=P({},va,{newState:0,oldState:0}),Bp=Ce(wp),kp=[9,13,27,32],Ys=bt&&"CompositionEvent"in window,El=null;bt&&"documentMode"in document&&(El=document.documentMode);var Yp=bt&&"TextEvent"in window&&!El,Zr=bt&&(!Ys||El&&8<El&&11>=El),Ku=" ",Ju=!1;function Kr(e,t){switch(e){case"keyup":return kp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jr(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var _a=!1;function qp(e,t){switch(e){case"compositionend":return Jr(t);case"keypress":return t.which!==32?null:(Ju=!0,Ku);case"textInput":return e=t.data,e===Ku&&Ju?null:e;default:return null}}function Lp(e,t){if(_a)return e==="compositionend"||!Ys&&Kr(e,t)?(e=Vr(),_n=Bs=Ht=null,_a=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Zr&&t.locale!=="ko"?null:t.data;default:return null}}var Gp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function $u(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Gp[e.type]:t==="textarea"}function $r(e,t,a,l){Da?Ga?Ga.push(l):Ga=[l]:Da=l,t=mi(t,"onChange"),0<t.length&&(a=new Ei("onChange","change",null,a,l),e.push({event:a,listeners:t}))}var Al=null,ql=null;function Xp(e){Vd(e,0)}function Ti(e){var t=Nl(e);if(Yr(t))return e}function Wu(e,t){if(e==="change")return t}var Wr=!1;if(bt){var Ii;if(bt){var Pi="oninput"in document;if(!Pi){var Fu=document.createElement("div");Fu.setAttribute("oninput","return;"),Pi=typeof Fu.oninput=="function"}Ii=Pi}else Ii=!1;Wr=Ii&&(!document.documentMode||9<document.documentMode)}function Iu(){Al&&(Al.detachEvent("onpropertychange",Fr),ql=Al=null)}function Fr(e){if(e.propertyName==="value"&&Ti(ql)){var t=[];$r(t,ql,e,ws(e)),Qr(Xp,t)}}function Qp(e,t,a){e==="focusin"?(Iu(),Al=t,ql=a,Al.attachEvent("onpropertychange",Fr)):e==="focusout"&&Iu()}function Vp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ti(ql)}function Zp(e,t){if(e==="click")return Ti(t)}function Kp(e,t){if(e==="input"||e==="change")return Ti(t)}function Jp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ye=typeof Object.is=="function"?Object.is:Jp;function Ll(e,t){if(Ye(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),l=Object.keys(t);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var n=a[l];if(!Uc.call(t,n)||!Ye(e[n],t[n]))return!1}return!0}function Pu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function eo(e,t){var a=Pu(e);e=0;for(var l;a;){if(a.nodeType===3){if(l=e+a.textContent.length,e<=t&&l>=t)return{node:a,offset:t-e};e=l}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Pu(a)}}function Ir(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ir(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Pr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=$n(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=$n(e.document)}return t}function qs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var $p=bt&&"documentMode"in document&&11>=document.documentMode,Ra=null,Lc=null,Tl=null,Gc=!1;function to(e,t,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Gc||Ra==null||Ra!==$n(l)||(l=Ra,"selectionStart"in l&&qs(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Tl&&Ll(Tl,l)||(Tl=l,l=mi(Lc,"onSelect"),0<l.length&&(t=new Ei("onSelect","select",null,t,a),e.push({event:t,listeners:l}),t.target=Ra)))}function ta(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var Ua={animationend:ta("Animation","AnimationEnd"),animationiteration:ta("Animation","AnimationIteration"),animationstart:ta("Animation","AnimationStart"),transitionrun:ta("Transition","TransitionRun"),transitionstart:ta("Transition","TransitionStart"),transitioncancel:ta("Transition","TransitionCancel"),transitionend:ta("Transition","TransitionEnd")},ec={},ef={};bt&&(ef=document.createElement("div").style,"AnimationEvent"in window||(delete Ua.animationend.animation,delete Ua.animationiteration.animation,delete Ua.animationstart.animation),"TransitionEvent"in window||delete Ua.transitionend.transition);function xa(e){if(ec[e])return ec[e];if(!Ua[e])return e;var t=Ua[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in ef)return ec[e]=t[a];return e}var tf=xa("animationend"),af=xa("animationiteration"),lf=xa("animationstart"),Wp=xa("transitionrun"),Fp=xa("transitionstart"),Ip=xa("transitioncancel"),nf=xa("transitionend"),cf=new Map,Xc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Xc.push("scrollEnd");function et(e,t){cf.set(e,t),ga(t,[e])}var Wn=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Ge=[],Ha=0,Ls=0;function Mi(){for(var e=Ha,t=Ls=Ha=0;t<e;){var a=Ge[t];Ge[t++]=null;var l=Ge[t];Ge[t++]=null;var n=Ge[t];Ge[t++]=null;var i=Ge[t];if(Ge[t++]=null,l!==null&&n!==null){var s=l.pending;s===null?n.next=n:(n.next=s.next,s.next=n),l.pending=n}i!==0&&sf(a,n,i)}}function Oi(e,t,a,l){Ge[Ha++]=e,Ge[Ha++]=t,Ge[Ha++]=a,Ge[Ha++]=l,Ls|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function Gs(e,t,a,l){return Oi(e,t,a,l),Fn(e)}function ya(e,t){return Oi(e,null,null,t),Fn(e)}function sf(e,t,a){e.lanes|=a;var l=e.alternate;l!==null&&(l.lanes|=a);for(var n=!1,i=e.return;i!==null;)i.childLanes|=a,l=i.alternate,l!==null&&(l.childLanes|=a),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(n=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,n&&t!==null&&(n=31-Be(a),e=i.hiddenUpdates,l=e[n],l===null?e[n]=[t]:l.push(t),t.lane=a|536870912),i):null}function Fn(e){if(50<wl)throw wl=0,rs=null,Error(y(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var wa={};function Pp(e,t,a,l){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Re(e,t,a,l){return new Pp(e,t,a,l)}function Xs(e){return e=e.prototype,!(!e||!e.isReactComponent)}function vt(e,t){var a=e.alternate;return a===null?(a=Re(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function uf(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Un(e,t,a,l,n,i){var s=0;if(l=e,typeof e=="function")Xs(e)&&(s=1);else if(typeof e=="string")s=n0(e,a,nt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Cc:return e=Re(31,a,t,n),e.elementType=Cc,e.lanes=i,e;case Ma:return sa(a.children,n,i,t);case Ar:s=8,n|=24;break;case Tc:return e=Re(12,a,t,n|2),e.elementType=Tc,e.lanes=i,e;case Mc:return e=Re(13,a,t,n),e.elementType=Mc,e.lanes=i,e;case Oc:return e=Re(19,a,t,n),e.elementType=Oc,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case pt:s=10;break e;case Tr:s=9;break e;case Os:s=11;break e;case Cs:s=14;break e;case Mt:s=16,l=null;break e}s=29,a=Error(y(130,e===null?"null":typeof e,"")),l=null}return t=Re(s,a,t,n),t.elementType=e,t.type=l,t.lanes=i,t}function sa(e,t,a,l){return e=Re(7,e,l,t),e.lanes=a,e}function tc(e,t,a){return e=Re(6,e,null,t),e.lanes=a,e}function of(e){var t=Re(18,null,null,0);return t.stateNode=e,t}function ac(e,t,a){return t=Re(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var ao=new WeakMap;function Ke(e,t){if(typeof e=="object"&&e!==null){var a=ao.get(e);return a!==void 0?a:(t={value:e,source:t,stack:wu(t)},ao.set(e,t),t)}return{value:e,source:t,stack:wu(t)}}var Ba=[],ka=0,In=null,Gl=0,Qe=[],Ve=0,Jt=null,tt=1,at="";function dt(e,t){Ba[ka++]=Gl,Ba[ka++]=In,In=e,Gl=t}function rf(e,t,a){Qe[Ve++]=tt,Qe[Ve++]=at,Qe[Ve++]=Jt,Jt=e;var l=tt;e=at;var n=32-Be(l)-1;l&=~(1<<n),a+=1;var i=32-Be(t)+n;if(30<i){var s=n-n%5;i=(l&(1<<s)-1).toString(32),l>>=s,n-=s,tt=1<<32-Be(t)+n|a<<n|l,at=i+e}else tt=1<<i|a<<n|l,at=e}function Qs(e){e.return!==null&&(dt(e,1),rf(e,1,0))}function Vs(e){for(;e===In;)In=Ba[--ka],Ba[ka]=null,Gl=Ba[--ka],Ba[ka]=null;for(;e===Jt;)Jt=Qe[--Ve],Qe[Ve]=null,at=Qe[--Ve],Qe[Ve]=null,tt=Qe[--Ve],Qe[Ve]=null}function ff(e,t){Qe[Ve++]=tt,Qe[Ve++]=at,Qe[Ve++]=Jt,tt=t.id,at=t.overflow,Jt=e}var xe=null,F=null,k=!1,qt=null,Je=!1,Qc=Error(y(519));function $t(e){var t=Error(y(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Xl(Ke(t,e)),Qc}function lo(e){var t=e.stateNode,a=e.type,l=e.memoizedProps;switch(t[ve]=e,t[Oe]=l,a){case"dialog":R("cancel",t),R("close",t);break;case"iframe":case"object":case"embed":R("load",t);break;case"video":case"audio":for(a=0;a<Kl.length;a++)R(Kl[a],t);break;case"source":R("error",t);break;case"img":case"image":case"link":R("error",t),R("load",t);break;case"details":R("toggle",t);break;case"input":R("invalid",t),qr(t,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":R("invalid",t);break;case"textarea":R("invalid",t),Gr(t,l.value,l.defaultValue,l.children)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||l.suppressHydrationWarning===!0||Kd(t.textContent,a)?(l.popover!=null&&(R("beforetoggle",t),R("toggle",t)),l.onScroll!=null&&R("scroll",t),l.onScrollEnd!=null&&R("scrollend",t),l.onClick!=null&&(t.onclick=ht),t=!0):t=!1,t||$t(e,!0)}function no(e){for(xe=e.return;xe;)switch(xe.tag){case 5:case 31:case 13:Je=!1;return;case 27:case 3:Je=!0;return;default:xe=xe.return}}function ja(e){if(e!==xe)return!1;if(!k)return no(e),k=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||hs(e.type,e.memoizedProps)),a=!a),a&&F&&$t(e),no(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(y(317));F=Vo(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(y(317));F=Vo(e)}else t===27?(t=F,Pt(e.type)?(e=ys,ys=null,F=e):F=t):F=xe?We(e.stateNode.nextSibling):null;return!0}function fa(){F=xe=null,k=!1}function lc(){var e=qt;return e!==null&&(Te===null?Te=e:Te.push.apply(Te,e),qt=null),e}function Xl(e){qt===null?qt=[e]:qt.push(e)}var Vc=it(null),ba=null,gt=null;function Ct(e,t,a){$(Vc,t._currentValue),t._currentValue=a}function xt(e){e._currentValue=Vc.current,he(Vc)}function Zc(e,t,a){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===a)break;e=e.return}}function Kc(e,t,a,l){var n=e.child;for(n!==null&&(n.return=e);n!==null;){var i=n.dependencies;if(i!==null){var s=n.child;i=i.firstContext;e:for(;i!==null;){var u=i;i=n;for(var o=0;o<t.length;o++)if(u.context===t[o]){i.lanes|=a,u=i.alternate,u!==null&&(u.lanes|=a),Zc(i.return,a,e),l||(s=null);break e}i=u.next}}else if(n.tag===18){if(s=n.return,s===null)throw Error(y(341));s.lanes|=a,i=s.alternate,i!==null&&(i.lanes|=a),Zc(s,a,e),s=null}else s=n.child;if(s!==null)s.return=n;else for(s=n;s!==null;){if(s===e){s=null;break}if(n=s.sibling,n!==null){n.return=s.return,s=n;break}s=s.return}n=s}}function sl(e,t,a,l){e=null;for(var n=t,i=!1;n!==null;){if(!i){if(n.flags&524288)i=!0;else if(n.flags&262144)break}if(n.tag===10){var s=n.alternate;if(s===null)throw Error(y(387));if(s=s.memoizedProps,s!==null){var u=n.type;Ye(n.pendingProps.value,s.value)||(e!==null?e.push(u):e=[u])}}else if(n===Vn.current){if(s=n.alternate,s===null)throw Error(y(387));s.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(e!==null?e.push($l):e=[$l])}n=n.return}e!==null&&Kc(t,e,a,l),t.flags|=262144}function Pn(e){for(e=e.firstContext;e!==null;){if(!Ye(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function da(e){ba=e,gt=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ye(e){return df(ba,e)}function Nn(e,t){return ba===null&&da(e),df(e,t)}function df(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},gt===null){if(e===null)throw Error(y(308));gt=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else gt=gt.next=t;return a}var eh=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,l){e.push(l)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},th=fe.unstable_scheduleCallback,ah=fe.unstable_NormalPriority,ue={$$typeof:pt,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zs(){return{controller:new eh,data:new Map,refCount:0}}function nn(e){e.refCount--,e.refCount===0&&th(ah,function(){e.controller.abort()})}var Ml=null,Jc=0,Wa=0,Xa=null;function lh(e,t){if(Ml===null){var a=Ml=[];Jc=0,Wa=vu(),Xa={status:"pending",value:void 0,then:function(l){a.push(l)}}}return Jc++,t.then(io,io),t}function io(){if(--Jc===0&&Ml!==null){Xa!==null&&(Xa.status="fulfilled");var e=Ml;Ml=null,Wa=0,Xa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function nh(e,t){var a=[],l={status:"pending",value:null,reason:null,then:function(n){a.push(n)}};return e.then(function(){l.status="fulfilled",l.value=t;for(var n=0;n<a.length;n++)(0,a[n])(t)},function(n){for(l.status="rejected",l.reason=n,n=0;n<a.length;n++)(0,a[n])(void 0)}),l}var co=E.S;E.S=function(e,t){Ad=He(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&lh(e,t),co!==null&&co(e,t)};var ua=it(null);function Ks(){var e=ua.current;return e!==null?e:K.pooledCache}function Hn(e,t){t===null?$(ua,ua.current):$(ua,t.pool)}function mf(){var e=Ks();return e===null?null:{parent:ue._currentValue,pool:e}}var ul=Error(y(460)),Js=Error(y(474)),Ci=Error(y(542)),ei={then:function(){}};function so(e){return e=e.status,e==="fulfilled"||e==="rejected"}function pf(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(ht,ht),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,oo(e),e;default:if(typeof t.status=="string")t.then(ht,ht);else{if(e=K,e!==null&&100<e.shellSuspendCounter)throw Error(y(482));e=t,e.status="pending",e.then(function(l){if(t.status==="pending"){var n=t;n.status="fulfilled",n.value=l}},function(l){if(t.status==="pending"){var n=t;n.status="rejected",n.reason=l}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,oo(e),e}throw oa=t,ul}}function na(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(oa=a,ul):a}}var oa=null;function uo(){if(oa===null)throw Error(y(459));var e=oa;return oa=null,e}function oo(e){if(e===ul||e===Ci)throw Error(y(483))}var Qa=null,Ql=0;function jn(e){var t=Ql;return Ql+=1,Qa===null&&(Qa=[]),pf(Qa,e,t)}function hl(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Sn(e,t){throw t.$$typeof===Qm?Error(y(525)):(e=Object.prototype.toString.call(t),Error(y(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function hf(e){function t(m,r){if(e){var p=m.deletions;p===null?(m.deletions=[r],m.flags|=16):p.push(r)}}function a(m,r){if(!e)return null;for(;r!==null;)t(m,r),r=r.sibling;return null}function l(m){for(var r=new Map;m!==null;)m.key!==null?r.set(m.key,m):r.set(m.index,m),m=m.sibling;return r}function n(m,r){return m=vt(m,r),m.index=0,m.sibling=null,m}function i(m,r,p){return m.index=p,e?(p=m.alternate,p!==null?(p=p.index,p<r?(m.flags|=67108866,r):p):(m.flags|=67108866,r)):(m.flags|=1048576,r)}function s(m){return e&&m.alternate===null&&(m.flags|=67108866),m}function u(m,r,p,x){return r===null||r.tag!==6?(r=tc(p,m.mode,x),r.return=m,r):(r=n(r,p),r.return=m,r)}function o(m,r,p,x){var z=p.type;return z===Ma?g(m,r,p.props.children,x,p.key):r!==null&&(r.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===Mt&&na(z)===r.type)?(r=n(r,p.props),hl(r,p),r.return=m,r):(r=Un(p.type,p.key,p.props,null,m.mode,x),hl(r,p),r.return=m,r)}function d(m,r,p,x){return r===null||r.tag!==4||r.stateNode.containerInfo!==p.containerInfo||r.stateNode.implementation!==p.implementation?(r=ac(p,m.mode,x),r.return=m,r):(r=n(r,p.children||[]),r.return=m,r)}function g(m,r,p,x,z){return r===null||r.tag!==7?(r=sa(p,m.mode,x,z),r.return=m,r):(r=n(r,p),r.return=m,r)}function v(m,r,p){if(typeof r=="string"&&r!==""||typeof r=="number"||typeof r=="bigint")return r=tc(""+r,m.mode,p),r.return=m,r;if(typeof r=="object"&&r!==null){switch(r.$$typeof){case hn:return p=Un(r.type,r.key,r.props,null,m.mode,p),hl(p,r),p.return=m,p;case yl:return r=ac(r,m.mode,p),r.return=m,r;case Mt:return r=na(r),v(m,r,p)}if(bl(r)||dl(r))return r=sa(r,m.mode,p,null),r.return=m,r;if(typeof r.then=="function")return v(m,jn(r),p);if(r.$$typeof===pt)return v(m,Nn(m,r),p);Sn(m,r)}return null}function f(m,r,p,x){var z=r!==null?r.key:null;if(typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint")return z!==null?null:u(m,r,""+p,x);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case hn:return p.key===z?o(m,r,p,x):null;case yl:return p.key===z?d(m,r,p,x):null;case Mt:return p=na(p),f(m,r,p,x)}if(bl(p)||dl(p))return z!==null?null:g(m,r,p,x,null);if(typeof p.then=="function")return f(m,r,jn(p),x);if(p.$$typeof===pt)return f(m,r,Nn(m,p),x);Sn(m,p)}return null}function h(m,r,p,x,z){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return m=m.get(p)||null,u(r,m,""+x,z);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case hn:return m=m.get(x.key===null?p:x.key)||null,o(r,m,x,z);case yl:return m=m.get(x.key===null?p:x.key)||null,d(r,m,x,z);case Mt:return x=na(x),h(m,r,p,x,z)}if(bl(x)||dl(x))return m=m.get(p)||null,g(r,m,x,z,null);if(typeof x.then=="function")return h(m,r,p,jn(x),z);if(x.$$typeof===pt)return h(m,r,p,Nn(r,x),z);Sn(r,x)}return null}function b(m,r,p,x){for(var z=null,O=null,N=r,A=r=0,C=null;N!==null&&A<p.length;A++){N.index>A?(C=N,N=null):C=N.sibling;var B=f(m,N,p[A],x);if(B===null){N===null&&(N=C);break}e&&N&&B.alternate===null&&t(m,N),r=i(B,r,A),O===null?z=B:O.sibling=B,O=B,N=C}if(A===p.length)return a(m,N),k&&dt(m,A),z;if(N===null){for(;A<p.length;A++)N=v(m,p[A],x),N!==null&&(r=i(N,r,A),O===null?z=N:O.sibling=N,O=N);return k&&dt(m,A),z}for(N=l(N);A<p.length;A++)C=h(N,m,A,p[A],x),C!==null&&(e&&C.alternate!==null&&N.delete(C.key===null?A:C.key),r=i(C,r,A),O===null?z=C:O.sibling=C,O=C);return e&&N.forEach(function(Le){return t(m,Le)}),k&&dt(m,A),z}function S(m,r,p,x){if(p==null)throw Error(y(151));for(var z=null,O=null,N=r,A=r=0,C=null,B=p.next();N!==null&&!B.done;A++,B=p.next()){N.index>A?(C=N,N=null):C=N.sibling;var Le=f(m,N,B.value,x);if(Le===null){N===null&&(N=C);break}e&&N&&Le.alternate===null&&t(m,N),r=i(Le,r,A),O===null?z=Le:O.sibling=Le,O=Le,N=C}if(B.done)return a(m,N),k&&dt(m,A),z;if(N===null){for(;!B.done;A++,B=p.next())B=v(m,B.value,x),B!==null&&(r=i(B,r,A),O===null?z=B:O.sibling=B,O=B);return k&&dt(m,A),z}for(N=l(N);!B.done;A++,B=p.next())B=h(N,m,A,B.value,x),B!==null&&(e&&B.alternate!==null&&N.delete(B.key===null?A:B.key),r=i(B,r,A),O===null?z=B:O.sibling=B,O=B);return e&&N.forEach(function(At){return t(m,At)}),k&&dt(m,A),z}function H(m,r,p,x){if(typeof p=="object"&&p!==null&&p.type===Ma&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case hn:e:{for(var z=p.key;r!==null;){if(r.key===z){if(z=p.type,z===Ma){if(r.tag===7){a(m,r.sibling),x=n(r,p.props.children),x.return=m,m=x;break e}}else if(r.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===Mt&&na(z)===r.type){a(m,r.sibling),x=n(r,p.props),hl(x,p),x.return=m,m=x;break e}a(m,r);break}else t(m,r);r=r.sibling}p.type===Ma?(x=sa(p.props.children,m.mode,x,p.key),x.return=m,m=x):(x=Un(p.type,p.key,p.props,null,m.mode,x),hl(x,p),x.return=m,m=x)}return s(m);case yl:e:{for(z=p.key;r!==null;){if(r.key===z)if(r.tag===4&&r.stateNode.containerInfo===p.containerInfo&&r.stateNode.implementation===p.implementation){a(m,r.sibling),x=n(r,p.children||[]),x.return=m,m=x;break e}else{a(m,r);break}else t(m,r);r=r.sibling}x=ac(p,m.mode,x),x.return=m,m=x}return s(m);case Mt:return p=na(p),H(m,r,p,x)}if(bl(p))return b(m,r,p,x);if(dl(p)){if(z=dl(p),typeof z!="function")throw Error(y(150));return p=z.call(p),S(m,r,p,x)}if(typeof p.then=="function")return H(m,r,jn(p),x);if(p.$$typeof===pt)return H(m,r,Nn(m,p),x);Sn(m,p)}return typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint"?(p=""+p,r!==null&&r.tag===6?(a(m,r.sibling),x=n(r,p),x.return=m,m=x):(a(m,r),x=tc(p,m.mode,x),x.return=m,m=x),s(m)):a(m,r)}return function(m,r,p,x){try{Ql=0;var z=H(m,r,p,x);return Qa=null,z}catch(N){if(N===ul||N===Ci)throw N;var O=Re(29,N,null,m.mode);return O.lanes=x,O.return=m,O}finally{}}}var ma=hf(!0),gf=hf(!1),Ot=!1;function $s(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function $c(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Lt(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Gt(e,t,a){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,q&2){var n=l.pending;return n===null?t.next=t:(t.next=n.next,n.next=t),l.pending=t,t=Fn(e),sf(e,null,a),t}return Oi(e,l,t,a),Fn(e)}function Ol(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,Rr(e,a)}}function nc(e,t){var a=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var n=null,i=null;if(a=a.firstBaseUpdate,a!==null){do{var s={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};i===null?n=i=s:i=i.next=s,a=a.next}while(a!==null);i===null?n=i=t:i=i.next=t}else n=i=t;a={baseState:l.baseState,firstBaseUpdate:n,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Wc=!1;function Cl(){if(Wc){var e=Xa;if(e!==null)throw e}}function Dl(e,t,a,l){Wc=!1;var n=e.updateQueue;Ot=!1;var i=n.firstBaseUpdate,s=n.lastBaseUpdate,u=n.shared.pending;if(u!==null){n.shared.pending=null;var o=u,d=o.next;o.next=null,s===null?i=d:s.next=d,s=o;var g=e.alternate;g!==null&&(g=g.updateQueue,u=g.lastBaseUpdate,u!==s&&(u===null?g.firstBaseUpdate=d:u.next=d,g.lastBaseUpdate=o))}if(i!==null){var v=n.baseState;s=0,g=d=o=null,u=i;do{var f=u.lane&-536870913,h=f!==u.lane;if(h?(w&f)===f:(l&f)===f){f!==0&&f===Wa&&(Wc=!0),g!==null&&(g=g.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});e:{var b=e,S=u;f=t;var H=a;switch(S.tag){case 1:if(b=S.payload,typeof b=="function"){v=b.call(H,v,f);break e}v=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=S.payload,f=typeof b=="function"?b.call(H,v,f):b,f==null)break e;v=P({},v,f);break e;case 2:Ot=!0}}f=u.callback,f!==null&&(e.flags|=64,h&&(e.flags|=8192),h=n.callbacks,h===null?n.callbacks=[f]:h.push(f))}else h={lane:f,tag:u.tag,payload:u.payload,callback:u.callback,next:null},g===null?(d=g=h,o=v):g=g.next=h,s|=f;if(u=u.next,u===null){if(u=n.shared.pending,u===null)break;h=u,u=h.next,h.next=null,n.lastBaseUpdate=h,n.shared.pending=null}}while(!0);g===null&&(o=v),n.baseState=o,n.firstBaseUpdate=d,n.lastBaseUpdate=g,i===null&&(n.shared.lanes=0),Ft|=s,e.lanes=s,e.memoizedState=v}}function vf(e,t){if(typeof e!="function")throw Error(y(191,e));e.call(t)}function xf(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)vf(a[e],t)}var Fa=it(null),ti=it(0);function ro(e,t){e=zt,$(ti,e),$(Fa,t),zt=e|t.baseLanes}function Fc(){$(ti,zt),$(Fa,Fa.current)}function Ws(){zt=ti.current,he(Fa),he(ti)}var qe=it(null),$e=null;function Dt(e){var t=e.alternate;$(ne,ne.current&1),$(qe,e),$e===null&&(t===null||Fa.current!==null||t.memoizedState!==null)&&($e=e)}function Ic(e){$(ne,ne.current),$(qe,e),$e===null&&($e=e)}function yf(e){e.tag===22?($(ne,ne.current),$(qe,e),$e===null&&($e=e)):_t()}function _t(){$(ne,ne.current),$(qe,qe.current)}function _e(e){he(qe),$e===e&&($e=null),he(ne)}var ne=it(0);function ai(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||vs(a)||xs(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Nt=0,M=null,Z=null,ce=null,li=!1,Va=!1,pa=!1,ni=0,Vl=0,Za=null,ih=0;function te(){throw Error(y(321))}function Fs(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!Ye(e[a],t[a]))return!1;return!0}function Is(e,t,a,l,n,i){return Nt=i,M=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,E.H=e===null||e.memoizedState===null?Wf:ou,pa=!1,i=a(l,n),pa=!1,Va&&(i=Nf(t,a,l,n)),bf(e),i}function bf(e){E.H=Zl;var t=Z!==null&&Z.next!==null;if(Nt=0,ce=Z=M=null,li=!1,Vl=0,Za=null,t)throw Error(y(300));e===null||oe||(e=e.dependencies,e!==null&&Pn(e)&&(oe=!0))}function Nf(e,t,a,l){M=e;var n=0;do{if(Va&&(Za=null),Vl=0,Va=!1,25<=n)throw Error(y(301));if(n+=1,ce=Z=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}E.H=Ff,i=t(a,l)}while(Va);return i}function ch(){var e=E.H,t=e.useState()[0];return t=typeof t.then=="function"?cn(t):t,e=e.useState()[0],(Z!==null?Z.memoizedState:null)!==e&&(M.flags|=1024),t}function Ps(){var e=ni!==0;return ni=0,e}function eu(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function tu(e){if(li){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}li=!1}Nt=0,ce=Z=M=null,Va=!1,Vl=ni=0,Za=null}function Ne(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ce===null?M.memoizedState=ce=e:ce=ce.next=e,ce}function ie(){if(Z===null){var e=M.alternate;e=e!==null?e.memoizedState:null}else e=Z.next;var t=ce===null?M.memoizedState:ce.next;if(t!==null)ce=t,Z=e;else{if(e===null)throw M.alternate===null?Error(y(467)):Error(y(310));Z=e,e={memoizedState:Z.memoizedState,baseState:Z.baseState,baseQueue:Z.baseQueue,queue:Z.queue,next:null},ce===null?M.memoizedState=ce=e:ce=ce.next=e}return ce}function Di(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function cn(e){var t=Vl;return Vl+=1,Za===null&&(Za=[]),e=pf(Za,e,t),t=M,(ce===null?t.memoizedState:ce.next)===null&&(t=t.alternate,E.H=t===null||t.memoizedState===null?Wf:ou),e}function _i(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return cn(e);if(e.$$typeof===pt)return ye(e)}throw Error(y(438,String(e)))}function au(e){var t=null,a=M.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var l=M.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(t={data:l.data.map(function(n){return n.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=Di(),M.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),l=0;l<e;l++)a[l]=Vm;return t.index++,a}function jt(e,t){return typeof t=="function"?t(e):t}function wn(e){var t=ie();return lu(t,Z,e)}function lu(e,t,a){var l=e.queue;if(l===null)throw Error(y(311));l.lastRenderedReducer=a;var n=e.baseQueue,i=l.pending;if(i!==null){if(n!==null){var s=n.next;n.next=i.next,i.next=s}t.baseQueue=n=i,l.pending=null}if(i=e.baseState,n===null)e.memoizedState=i;else{t=n.next;var u=s=null,o=null,d=t,g=!1;do{var v=d.lane&-536870913;if(v!==d.lane?(w&v)===v:(Nt&v)===v){var f=d.revertLane;if(f===0)o!==null&&(o=o.next={lane:0,revertLane:0,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),v===Wa&&(g=!0);else if((Nt&f)===f){d=d.next,f===Wa&&(g=!0);continue}else v={lane:0,revertLane:d.revertLane,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},o===null?(u=o=v,s=i):o=o.next=v,M.lanes|=f,Ft|=f;v=d.action,pa&&a(i,v),i=d.hasEagerState?d.eagerState:a(i,v)}else f={lane:v,revertLane:d.revertLane,gesture:d.gesture,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},o===null?(u=o=f,s=i):o=o.next=f,M.lanes|=v,Ft|=v;d=d.next}while(d!==null&&d!==t);if(o===null?s=i:o.next=u,!Ye(i,e.memoizedState)&&(oe=!0,g&&(a=Xa,a!==null)))throw a;e.memoizedState=i,e.baseState=s,e.baseQueue=o,l.lastRenderedState=i}return n===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function ic(e){var t=ie(),a=t.queue;if(a===null)throw Error(y(311));a.lastRenderedReducer=e;var l=a.dispatch,n=a.pending,i=t.memoizedState;if(n!==null){a.pending=null;var s=n=n.next;do i=e(i,s.action),s=s.next;while(s!==n);Ye(i,t.memoizedState)||(oe=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),a.lastRenderedState=i}return[i,l]}function jf(e,t,a){var l=M,n=ie(),i=k;if(i){if(a===void 0)throw Error(y(407));a=a()}else a=t();var s=!Ye((Z||n).memoizedState,a);if(s&&(n.memoizedState=a,oe=!0),n=n.queue,nu(Ef.bind(null,l,n,e),[e]),n.getSnapshot!==t||s||ce!==null&&ce.memoizedState.tag&1){if(l.flags|=2048,Ia(9,{destroy:void 0},zf.bind(null,l,n,a,t),null),K===null)throw Error(y(349));i||Nt&127||Sf(l,t,a)}return a}function Sf(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=M.updateQueue,t===null?(t=Di(),M.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function zf(e,t,a,l){t.value=a,t.getSnapshot=l,Af(t)&&Tf(e)}function Ef(e,t,a){return a(function(){Af(t)&&Tf(e)})}function Af(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!Ye(e,a)}catch{return!0}}function Tf(e){var t=ya(e,2);t!==null&&Me(t,e,2)}function Pc(e){var t=Ne();if(typeof e=="function"){var a=e;if(e=a(),pa){Ut(!0);try{a()}finally{Ut(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:jt,lastRenderedState:e},t}function Mf(e,t,a,l){return e.baseState=a,lu(e,Z,typeof l=="function"?l:jt)}function sh(e,t,a,l,n){if(Ui(e))throw Error(y(485));if(e=t.action,e!==null){var i={payload:n,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){i.listeners.push(s)}};E.T!==null?a(!0):i.isTransition=!1,l(i),a=t.pending,a===null?(i.next=t.pending=i,Of(t,i)):(i.next=a.next,t.pending=a.next=i)}}function Of(e,t){var a=t.action,l=t.payload,n=e.state;if(t.isTransition){var i=E.T,s={};E.T=s;try{var u=a(n,l),o=E.S;o!==null&&o(s,u),fo(e,t,u)}catch(d){es(e,t,d)}finally{i!==null&&s.types!==null&&(i.types=s.types),E.T=i}}else try{i=a(n,l),fo(e,t,i)}catch(d){es(e,t,d)}}function fo(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){mo(e,t,l)},function(l){return es(e,t,l)}):mo(e,t,a)}function mo(e,t,a){t.status="fulfilled",t.value=a,Cf(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Of(e,a)))}function es(e,t,a){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do t.status="rejected",t.reason=a,Cf(t),t=t.next;while(t!==l)}e.action=null}function Cf(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Df(e,t){return t}function po(e,t){if(k){var a=K.formState;if(a!==null){e:{var l=M;if(k){if(F){t:{for(var n=F,i=Je;n.nodeType!==8;){if(!i){n=null;break t}if(n=We(n.nextSibling),n===null){n=null;break t}}i=n.data,n=i==="F!"||i==="F"?n:null}if(n){F=We(n.nextSibling),l=n.data==="F!";break e}}$t(l)}l=!1}l&&(t=a[0])}}return a=Ne(),a.memoizedState=a.baseState=t,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Df,lastRenderedState:t},a.queue=l,a=Kf.bind(null,M,l),l.dispatch=a,l=Pc(!1),i=uu.bind(null,M,!1,l.queue),l=Ne(),n={state:t,dispatch:null,action:e,pending:null},l.queue=n,a=sh.bind(null,M,n,i,a),n.dispatch=a,l.memoizedState=e,[t,a,!1]}function ho(e){var t=ie();return _f(t,Z,e)}function _f(e,t,a){if(t=lu(e,t,Df)[0],e=wn(jt)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var l=cn(t)}catch(s){throw s===ul?Ci:s}else l=t;t=ie();var n=t.queue,i=n.dispatch;return a!==t.memoizedState&&(M.flags|=2048,Ia(9,{destroy:void 0},uh.bind(null,n,a),null)),[l,i,e]}function uh(e,t){e.action=t}function go(e){var t=ie(),a=Z;if(a!==null)return _f(t,a,e);ie(),t=t.memoizedState,a=ie();var l=a.queue.dispatch;return a.memoizedState=e,[t,l,!1]}function Ia(e,t,a,l){return e={tag:e,create:a,deps:l,inst:t,next:null},t=M.updateQueue,t===null&&(t=Di(),M.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(l=a.next,a.next=e,e.next=l,t.lastEffect=e),e}function Rf(){return ie().memoizedState}function Bn(e,t,a,l){var n=Ne();M.flags|=e,n.memoizedState=Ia(1|t,{destroy:void 0},a,l===void 0?null:l)}function Ri(e,t,a,l){var n=ie();l=l===void 0?null:l;var i=n.memoizedState.inst;Z!==null&&l!==null&&Fs(l,Z.memoizedState.deps)?n.memoizedState=Ia(t,i,a,l):(M.flags|=e,n.memoizedState=Ia(1|t,i,a,l))}function vo(e,t){Bn(8390656,8,e,t)}function nu(e,t){Ri(2048,8,e,t)}function oh(e){M.flags|=4;var t=M.updateQueue;if(t===null)t=Di(),M.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function Uf(e){var t=ie().memoizedState;return oh({ref:t,nextImpl:e}),function(){if(q&2)throw Error(y(440));return t.impl.apply(void 0,arguments)}}function Hf(e,t){return Ri(4,2,e,t)}function wf(e,t){return Ri(4,4,e,t)}function Bf(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function kf(e,t,a){a=a!=null?a.concat([e]):null,Ri(4,4,Bf.bind(null,t,e),a)}function iu(){}function Yf(e,t){var a=ie();t=t===void 0?null:t;var l=a.memoizedState;return t!==null&&Fs(t,l[1])?l[0]:(a.memoizedState=[e,t],e)}function qf(e,t){var a=ie();t=t===void 0?null:t;var l=a.memoizedState;if(t!==null&&Fs(t,l[1]))return l[0];if(l=e(),pa){Ut(!0);try{e()}finally{Ut(!1)}}return a.memoizedState=[l,t],l}function cu(e,t,a){return a===void 0||Nt&1073741824&&!(w&261930)?e.memoizedState=t:(e.memoizedState=a,e=Md(),M.lanes|=e,Ft|=e,a)}function Lf(e,t,a,l){return Ye(a,t)?a:Fa.current!==null?(e=cu(e,a,l),Ye(e,t)||(oe=!0),e):!(Nt&42)||Nt&1073741824&&!(w&261930)?(oe=!0,e.memoizedState=a):(e=Md(),M.lanes|=e,Ft|=e,t)}function Gf(e,t,a,l,n){var i=L.p;L.p=i!==0&&8>i?i:8;var s=E.T,u={};E.T=u,uu(e,!1,t,a);try{var o=n(),d=E.S;if(d!==null&&d(u,o),o!==null&&typeof o=="object"&&typeof o.then=="function"){var g=nh(o,l);_l(e,t,g,ke(e))}else _l(e,t,l,ke(e))}catch(v){_l(e,t,{then:function(){},status:"rejected",reason:v},ke())}finally{L.p=i,s!==null&&u.types!==null&&(s.types=u.types),E.T=s}}function rh(){}function ts(e,t,a,l){if(e.tag!==5)throw Error(y(476));var n=Xf(e).queue;Gf(e,n,t,ca,a===null?rh:function(){return Qf(e),a(l)})}function Xf(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ca,baseState:ca,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jt,lastRenderedState:ca},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jt,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Qf(e){var t=Xf(e);t.next===null&&(t=e.alternate.memoizedState),_l(e,t.next.queue,{},ke())}function su(){return ye($l)}function Vf(){return ie().memoizedState}function Zf(){return ie().memoizedState}function fh(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=ke();e=Lt(a);var l=Gt(t,e,a);l!==null&&(Me(l,t,a),Ol(l,t,a)),t={cache:Zs()},e.payload=t;return}t=t.return}}function dh(e,t,a){var l=ke();a={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Ui(e)?Jf(t,a):(a=Gs(e,t,a,l),a!==null&&(Me(a,e,l),$f(a,t,l)))}function Kf(e,t,a){var l=ke();_l(e,t,a,l)}function _l(e,t,a,l){var n={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Ui(e))Jf(t,n);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var s=t.lastRenderedState,u=i(s,a);if(n.hasEagerState=!0,n.eagerState=u,Ye(u,s))return Oi(e,t,n,0),K===null&&Mi(),!1}catch{}finally{}if(a=Gs(e,t,n,l),a!==null)return Me(a,e,l),$f(a,t,l),!0}return!1}function uu(e,t,a,l){if(l={lane:2,revertLane:vu(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},Ui(e)){if(t)throw Error(y(479))}else t=Gs(e,a,l,2),t!==null&&Me(t,e,2)}function Ui(e){var t=e.alternate;return e===M||t!==null&&t===M}function Jf(e,t){Va=li=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function $f(e,t,a){if(a&4194048){var l=t.lanes;l&=e.pendingLanes,a|=l,t.lanes=a,Rr(e,a)}}var Zl={readContext:ye,use:_i,useCallback:te,useContext:te,useEffect:te,useImperativeHandle:te,useLayoutEffect:te,useInsertionEffect:te,useMemo:te,useReducer:te,useRef:te,useState:te,useDebugValue:te,useDeferredValue:te,useTransition:te,useSyncExternalStore:te,useId:te,useHostTransitionStatus:te,useFormState:te,useActionState:te,useOptimistic:te,useMemoCache:te,useCacheRefresh:te};Zl.useEffectEvent=te;var Wf={readContext:ye,use:_i,useCallback:function(e,t){return Ne().memoizedState=[e,t===void 0?null:t],e},useContext:ye,useEffect:vo,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,Bn(4194308,4,Bf.bind(null,t,e),a)},useLayoutEffect:function(e,t){return Bn(4194308,4,e,t)},useInsertionEffect:function(e,t){Bn(4,2,e,t)},useMemo:function(e,t){var a=Ne();t=t===void 0?null:t;var l=e();if(pa){Ut(!0);try{e()}finally{Ut(!1)}}return a.memoizedState=[l,t],l},useReducer:function(e,t,a){var l=Ne();if(a!==void 0){var n=a(t);if(pa){Ut(!0);try{a(t)}finally{Ut(!1)}}}else n=t;return l.memoizedState=l.baseState=n,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},l.queue=e,e=e.dispatch=dh.bind(null,M,e),[l.memoizedState,e]},useRef:function(e){var t=Ne();return e={current:e},t.memoizedState=e},useState:function(e){e=Pc(e);var t=e.queue,a=Kf.bind(null,M,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:iu,useDeferredValue:function(e,t){var a=Ne();return cu(a,e,t)},useTransition:function(){var e=Pc(!1);return e=Gf.bind(null,M,e.queue,!0,!1),Ne().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var l=M,n=Ne();if(k){if(a===void 0)throw Error(y(407));a=a()}else{if(a=t(),K===null)throw Error(y(349));w&127||Sf(l,t,a)}n.memoizedState=a;var i={value:a,getSnapshot:t};return n.queue=i,vo(Ef.bind(null,l,i,e),[e]),l.flags|=2048,Ia(9,{destroy:void 0},zf.bind(null,l,i,a,t),null),a},useId:function(){var e=Ne(),t=K.identifierPrefix;if(k){var a=at,l=tt;a=(l&~(1<<32-Be(l)-1)).toString(32)+a,t="_"+t+"R_"+a,a=ni++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=ih++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:su,useFormState:po,useActionState:po,useOptimistic:function(e){var t=Ne();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=uu.bind(null,M,!0,a),a.dispatch=t,[e,t]},useMemoCache:au,useCacheRefresh:function(){return Ne().memoizedState=fh.bind(null,M)},useEffectEvent:function(e){var t=Ne(),a={impl:e};return t.memoizedState=a,function(){if(q&2)throw Error(y(440));return a.impl.apply(void 0,arguments)}}},ou={readContext:ye,use:_i,useCallback:Yf,useContext:ye,useEffect:nu,useImperativeHandle:kf,useInsertionEffect:Hf,useLayoutEffect:wf,useMemo:qf,useReducer:wn,useRef:Rf,useState:function(){return wn(jt)},useDebugValue:iu,useDeferredValue:function(e,t){var a=ie();return Lf(a,Z.memoizedState,e,t)},useTransition:function(){var e=wn(jt)[0],t=ie().memoizedState;return[typeof e=="boolean"?e:cn(e),t]},useSyncExternalStore:jf,useId:Vf,useHostTransitionStatus:su,useFormState:ho,useActionState:ho,useOptimistic:function(e,t){var a=ie();return Mf(a,Z,e,t)},useMemoCache:au,useCacheRefresh:Zf};ou.useEffectEvent=Uf;var Ff={readContext:ye,use:_i,useCallback:Yf,useContext:ye,useEffect:nu,useImperativeHandle:kf,useInsertionEffect:Hf,useLayoutEffect:wf,useMemo:qf,useReducer:ic,useRef:Rf,useState:function(){return ic(jt)},useDebugValue:iu,useDeferredValue:function(e,t){var a=ie();return Z===null?cu(a,e,t):Lf(a,Z.memoizedState,e,t)},useTransition:function(){var e=ic(jt)[0],t=ie().memoizedState;return[typeof e=="boolean"?e:cn(e),t]},useSyncExternalStore:jf,useId:Vf,useHostTransitionStatus:su,useFormState:go,useActionState:go,useOptimistic:function(e,t){var a=ie();return Z!==null?Mf(a,Z,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:au,useCacheRefresh:Zf};Ff.useEffectEvent=Uf;function cc(e,t,a,l){t=e.memoizedState,a=a(l,t),a=a==null?t:P({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var as={enqueueSetState:function(e,t,a){e=e._reactInternals;var l=ke(),n=Lt(l);n.payload=t,a!=null&&(n.callback=a),t=Gt(e,n,l),t!==null&&(Me(t,e,l),Ol(t,e,l))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var l=ke(),n=Lt(l);n.tag=1,n.payload=t,a!=null&&(n.callback=a),t=Gt(e,n,l),t!==null&&(Me(t,e,l),Ol(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=ke(),l=Lt(a);l.tag=2,t!=null&&(l.callback=t),t=Gt(e,l,a),t!==null&&(Me(t,e,a),Ol(t,e,a))}};function xo(e,t,a,l,n,i,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,i,s):t.prototype&&t.prototype.isPureReactComponent?!Ll(a,l)||!Ll(n,i):!0}function yo(e,t,a,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,l),t.state!==e&&as.enqueueReplaceState(t,t.state,null)}function ha(e,t){var a=t;if("ref"in t){a={};for(var l in t)l!=="ref"&&(a[l]=t[l])}if(e=e.defaultProps){a===t&&(a=P({},a));for(var n in e)a[n]===void 0&&(a[n]=e[n])}return a}function If(e){Wn(e)}function Pf(e){console.error(e)}function ed(e){Wn(e)}function ii(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(l){setTimeout(function(){throw l})}}function bo(e,t,a){try{var l=e.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function ls(e,t,a){return a=Lt(a),a.tag=3,a.payload={element:null},a.callback=function(){ii(e,t)},a}function td(e){return e=Lt(e),e.tag=3,e}function ad(e,t,a,l){var n=a.type.getDerivedStateFromError;if(typeof n=="function"){var i=l.value;e.payload=function(){return n(i)},e.callback=function(){bo(t,a,l)}}var s=a.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(e.callback=function(){bo(t,a,l),typeof n!="function"&&(Xt===null?Xt=new Set([this]):Xt.add(this));var u=l.stack;this.componentDidCatch(l.value,{componentStack:u!==null?u:""})})}function mh(e,t,a,l,n){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(t=a.alternate,t!==null&&sl(t,a,n,!0),a=qe.current,a!==null){switch(a.tag){case 31:case 13:return $e===null?ri():a.alternate===null&&ae===0&&(ae=3),a.flags&=-257,a.flags|=65536,a.lanes=n,l===ei?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([l]):t.add(l),vc(e,l,n)),!1;case 22:return a.flags|=65536,l===ei?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([l]):a.add(l)),vc(e,l,n)),!1}throw Error(y(435,a.tag))}return vc(e,l,n),ri(),!1}if(k)return t=qe.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=n,l!==Qc&&(e=Error(y(422),{cause:l}),Xl(Ke(e,a)))):(l!==Qc&&(t=Error(y(423),{cause:l}),Xl(Ke(t,a))),e=e.current.alternate,e.flags|=65536,n&=-n,e.lanes|=n,l=Ke(l,a),n=ls(e.stateNode,l,n),nc(e,n),ae!==4&&(ae=2)),!1;var i=Error(y(520),{cause:l});if(i=Ke(i,a),Hl===null?Hl=[i]:Hl.push(i),ae!==4&&(ae=2),t===null)return!0;l=Ke(l,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=n&-n,a.lanes|=e,e=ls(a.stateNode,l,e),nc(a,e),!1;case 1:if(t=a.type,i=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(Xt===null||!Xt.has(i))))return a.flags|=65536,n&=-n,a.lanes|=n,n=td(n),ad(n,e,a,l),nc(a,n),!1}a=a.return}while(a!==null);return!1}var ru=Error(y(461)),oe=!1;function ge(e,t,a,l){t.child=e===null?gf(t,null,a,l):ma(t,e.child,a,l)}function No(e,t,a,l,n){a=a.render;var i=t.ref;if("ref"in l){var s={};for(var u in l)u!=="ref"&&(s[u]=l[u])}else s=l;return da(t),l=Is(e,t,a,s,i,n),u=Ps(),e!==null&&!oe?(eu(e,t,n),St(e,t,n)):(k&&u&&Qs(t),t.flags|=1,ge(e,t,l,n),t.child)}function jo(e,t,a,l,n){if(e===null){var i=a.type;return typeof i=="function"&&!Xs(i)&&i.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=i,ld(e,t,i,l,n)):(e=Un(a.type,null,l,t,t.mode,n),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!fu(e,n)){var s=i.memoizedProps;if(a=a.compare,a=a!==null?a:Ll,a(s,l)&&e.ref===t.ref)return St(e,t,n)}return t.flags|=1,e=vt(i,l),e.ref=t.ref,e.return=t,t.child=e}function ld(e,t,a,l,n){if(e!==null){var i=e.memoizedProps;if(Ll(i,l)&&e.ref===t.ref)if(oe=!1,t.pendingProps=l=i,fu(e,n))e.flags&131072&&(oe=!0);else return t.lanes=e.lanes,St(e,t,n)}return ns(e,t,a,l,n)}function nd(e,t,a,l){var n=l.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if(t.flags&128){if(i=i!==null?i.baseLanes|a:a,e!==null){for(l=t.child=e.child,n=0;l!==null;)n=n|l.lanes|l.childLanes,l=l.sibling;l=n&~i}else l=0,t.child=null;return So(e,t,i,a,l)}if(a&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Hn(t,i!==null?i.cachePool:null),i!==null?ro(t,i):Fc(),yf(t);else return l=t.lanes=536870912,So(e,t,i!==null?i.baseLanes|a:a,a,l)}else i!==null?(Hn(t,i.cachePool),ro(t,i),_t(),t.memoizedState=null):(e!==null&&Hn(t,null),Fc(),_t());return ge(e,t,n,a),t.child}function jl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function So(e,t,a,l,n){var i=Ks();return i=i===null?null:{parent:ue._currentValue,pool:i},t.memoizedState={baseLanes:a,cachePool:i},e!==null&&Hn(t,null),Fc(),yf(t),e!==null&&sl(e,t,l,!0),t.childLanes=n,null}function kn(e,t){return t=ci({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function zo(e,t,a){return ma(t,e.child,null,a),e=kn(t,t.pendingProps),e.flags|=2,_e(t),t.memoizedState=null,e}function ph(e,t,a){var l=t.pendingProps,n=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(k){if(l.mode==="hidden")return e=kn(t,l),t.lanes=536870912,jl(null,e);if(Ic(t),(e=F)?(e=Wd(e,Je),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Jt!==null?{id:tt,overflow:at}:null,retryLane:536870912,hydrationErrors:null},a=of(e),a.return=t,t.child=a,xe=t,F=null)):e=null,e===null)throw $t(t);return t.lanes=536870912,null}return kn(t,l)}var i=e.memoizedState;if(i!==null){var s=i.dehydrated;if(Ic(t),n)if(t.flags&256)t.flags&=-257,t=zo(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(y(558));else if(oe||sl(e,t,a,!1),n=(a&e.childLanes)!==0,oe||n){if(l=K,l!==null&&(s=Ur(l,a),s!==0&&s!==i.retryLane))throw i.retryLane=s,ya(e,s),Me(l,e,s),ru;ri(),t=zo(e,t,a)}else e=i.treeContext,F=We(s.nextSibling),xe=t,k=!0,qt=null,Je=!1,e!==null&&ff(t,e),t=kn(t,l),t.flags|=4096;return t}return e=vt(e.child,{mode:l.mode,children:l.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Yn(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(y(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function ns(e,t,a,l,n){return da(t),a=Is(e,t,a,l,void 0,n),l=Ps(),e!==null&&!oe?(eu(e,t,n),St(e,t,n)):(k&&l&&Qs(t),t.flags|=1,ge(e,t,a,n),t.child)}function Eo(e,t,a,l,n,i){return da(t),t.updateQueue=null,a=Nf(t,l,a,n),bf(e),l=Ps(),e!==null&&!oe?(eu(e,t,i),St(e,t,i)):(k&&l&&Qs(t),t.flags|=1,ge(e,t,a,i),t.child)}function Ao(e,t,a,l,n){if(da(t),t.stateNode===null){var i=wa,s=a.contextType;typeof s=="object"&&s!==null&&(i=ye(s)),i=new a(l,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=as,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=l,i.state=t.memoizedState,i.refs={},$s(t),s=a.contextType,i.context=typeof s=="object"&&s!==null?ye(s):wa,i.state=t.memoizedState,s=a.getDerivedStateFromProps,typeof s=="function"&&(cc(t,a,s,l),i.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(s=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),s!==i.state&&as.enqueueReplaceState(i,i.state,null),Dl(t,l,i,n),Cl(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),l=!0}else if(e===null){i=t.stateNode;var u=t.memoizedProps,o=ha(a,u);i.props=o;var d=i.context,g=a.contextType;s=wa,typeof g=="object"&&g!==null&&(s=ye(g));var v=a.getDerivedStateFromProps;g=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=t.pendingProps!==u,g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||d!==s)&&yo(t,i,l,s),Ot=!1;var f=t.memoizedState;i.state=f,Dl(t,l,i,n),Cl(),d=t.memoizedState,u||f!==d||Ot?(typeof v=="function"&&(cc(t,a,v,l),d=t.memoizedState),(o=Ot||xo(t,a,o,l,f,d,s))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=d),i.props=l,i.state=d,i.context=s,l=o):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{i=t.stateNode,$c(e,t),s=t.memoizedProps,g=ha(a,s),i.props=g,v=t.pendingProps,f=i.context,d=a.contextType,o=wa,typeof d=="object"&&d!==null&&(o=ye(d)),u=a.getDerivedStateFromProps,(d=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==v||f!==o)&&yo(t,i,l,o),Ot=!1,f=t.memoizedState,i.state=f,Dl(t,l,i,n),Cl();var h=t.memoizedState;s!==v||f!==h||Ot||e!==null&&e.dependencies!==null&&Pn(e.dependencies)?(typeof u=="function"&&(cc(t,a,u,l),h=t.memoizedState),(g=Ot||xo(t,a,g,l,f,h,o)||e!==null&&e.dependencies!==null&&Pn(e.dependencies))?(d||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,h,o),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,h,o)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=h),i.props=l,i.state=h,i.context=o,l=g):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),l=!1)}return i=l,Yn(e,t),l=(t.flags&128)!==0,i||l?(i=t.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&l?(t.child=ma(t,e.child,null,n),t.child=ma(t,null,a,n)):ge(e,t,a,n),t.memoizedState=i.state,e=t.child):e=St(e,t,n),e}function To(e,t,a,l){return fa(),t.flags|=256,ge(e,t,a,l),t.child}var sc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function uc(e){return{baseLanes:e,cachePool:mf()}}function oc(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=Ue),e}function id(e,t,a){var l=t.pendingProps,n=!1,i=(t.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(ne.current&2)!==0),s&&(n=!0,t.flags&=-129),s=(t.flags&32)!==0,t.flags&=-33,e===null){if(k){if(n?Dt(t):_t(),(e=F)?(e=Wd(e,Je),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Jt!==null?{id:tt,overflow:at}:null,retryLane:536870912,hydrationErrors:null},a=of(e),a.return=t,t.child=a,xe=t,F=null)):e=null,e===null)throw $t(t);return xs(e)?t.lanes=32:t.lanes=536870912,null}var u=l.children;return l=l.fallback,n?(_t(),n=t.mode,u=ci({mode:"hidden",children:u},n),l=sa(l,n,a,null),u.return=t,l.return=t,u.sibling=l,t.child=u,l=t.child,l.memoizedState=uc(a),l.childLanes=oc(e,s,a),t.memoizedState=sc,jl(null,l)):(Dt(t),is(t,u))}var o=e.memoizedState;if(o!==null&&(u=o.dehydrated,u!==null)){if(i)t.flags&256?(Dt(t),t.flags&=-257,t=rc(e,t,a)):t.memoizedState!==null?(_t(),t.child=e.child,t.flags|=128,t=null):(_t(),u=l.fallback,n=t.mode,l=ci({mode:"visible",children:l.children},n),u=sa(u,n,a,null),u.flags|=2,l.return=t,u.return=t,l.sibling=u,t.child=l,ma(t,e.child,null,a),l=t.child,l.memoizedState=uc(a),l.childLanes=oc(e,s,a),t.memoizedState=sc,t=jl(null,l));else if(Dt(t),xs(u)){if(s=u.nextSibling&&u.nextSibling.dataset,s)var d=s.dgst;s=d,l=Error(y(419)),l.stack="",l.digest=s,Xl({value:l,source:null,stack:null}),t=rc(e,t,a)}else if(oe||sl(e,t,a,!1),s=(a&e.childLanes)!==0,oe||s){if(s=K,s!==null&&(l=Ur(s,a),l!==0&&l!==o.retryLane))throw o.retryLane=l,ya(e,l),Me(s,e,l),ru;vs(u)||ri(),t=rc(e,t,a)}else vs(u)?(t.flags|=192,t.child=e.child,t=null):(e=o.treeContext,F=We(u.nextSibling),xe=t,k=!0,qt=null,Je=!1,e!==null&&ff(t,e),t=is(t,l.children),t.flags|=4096);return t}return n?(_t(),u=l.fallback,n=t.mode,o=e.child,d=o.sibling,l=vt(o,{mode:"hidden",children:l.children}),l.subtreeFlags=o.subtreeFlags&65011712,d!==null?u=vt(d,u):(u=sa(u,n,a,null),u.flags|=2),u.return=t,l.return=t,l.sibling=u,t.child=l,jl(null,l),l=t.child,u=e.child.memoizedState,u===null?u=uc(a):(n=u.cachePool,n!==null?(o=ue._currentValue,n=n.parent!==o?{parent:o,pool:o}:n):n=mf(),u={baseLanes:u.baseLanes|a,cachePool:n}),l.memoizedState=u,l.childLanes=oc(e,s,a),t.memoizedState=sc,jl(e.child,l)):(Dt(t),a=e.child,e=a.sibling,a=vt(a,{mode:"visible",children:l.children}),a.return=t,a.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=a,t.memoizedState=null,a)}function is(e,t){return t=ci({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function ci(e,t){return e=Re(22,e,null,t),e.lanes=0,e}function rc(e,t,a){return ma(t,e.child,null,a),e=is(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Mo(e,t,a){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),Zc(e.return,t,a)}function fc(e,t,a,l,n,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:n,treeForkCount:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=l,s.tail=a,s.tailMode=n,s.treeForkCount=i)}function cd(e,t,a){var l=t.pendingProps,n=l.revealOrder,i=l.tail;l=l.children;var s=ne.current,u=(s&2)!==0;if(u?(s=s&1|2,t.flags|=128):s&=1,$(ne,s),ge(e,t,l,a),l=k?Gl:0,!u&&e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Mo(e,a,t);else if(e.tag===19)Mo(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(n){case"forwards":for(a=t.child,n=null;a!==null;)e=a.alternate,e!==null&&ai(e)===null&&(n=a),a=a.sibling;a=n,a===null?(n=t.child,t.child=null):(n=a.sibling,a.sibling=null),fc(t,!1,n,a,i,l);break;case"backwards":case"unstable_legacy-backwards":for(a=null,n=t.child,t.child=null;n!==null;){if(e=n.alternate,e!==null&&ai(e)===null){t.child=n;break}e=n.sibling,n.sibling=a,a=n,n=e}fc(t,!0,a,null,i,l);break;case"together":fc(t,!1,null,null,void 0,l);break;default:t.memoizedState=null}return t.child}function St(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),Ft|=t.lanes,!(a&t.childLanes))if(e!==null){if(sl(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(y(153));if(t.child!==null){for(e=t.child,a=vt(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=vt(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function fu(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&Pn(e)))}function hh(e,t,a){switch(t.tag){case 3:Zn(t,t.stateNode.containerInfo),Ct(t,ue,e.memoizedState.cache),fa();break;case 27:case 5:Rc(t);break;case 4:Zn(t,t.stateNode.containerInfo);break;case 10:Ct(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Ic(t),null;break;case 13:var l=t.memoizedState;if(l!==null)return l.dehydrated!==null?(Dt(t),t.flags|=128,null):a&t.child.childLanes?id(e,t,a):(Dt(t),e=St(e,t,a),e!==null?e.sibling:null);Dt(t);break;case 19:var n=(e.flags&128)!==0;if(l=(a&t.childLanes)!==0,l||(sl(e,t,a,!1),l=(a&t.childLanes)!==0),n){if(l)return cd(e,t,a);t.flags|=128}if(n=t.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),$(ne,ne.current),l)break;return null;case 22:return t.lanes=0,nd(e,t,a,t.pendingProps);case 24:Ct(t,ue,e.memoizedState.cache)}return St(e,t,a)}function sd(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)oe=!0;else{if(!fu(e,a)&&!(t.flags&128))return oe=!1,hh(e,t,a);oe=!!(e.flags&131072)}else oe=!1,k&&t.flags&1048576&&rf(t,Gl,t.index);switch(t.lanes=0,t.tag){case 16:e:{var l=t.pendingProps;if(e=na(t.elementType),t.type=e,typeof e=="function")Xs(e)?(l=ha(e,l),t.tag=1,t=Ao(null,t,e,l,a)):(t.tag=0,t=ns(null,t,e,l,a));else{if(e!=null){var n=e.$$typeof;if(n===Os){t.tag=11,t=No(null,t,e,l,a);break e}else if(n===Cs){t.tag=14,t=jo(null,t,e,l,a);break e}}throw t=Dc(e)||e,Error(y(306,t,""))}}return t;case 0:return ns(e,t,t.type,t.pendingProps,a);case 1:return l=t.type,n=ha(l,t.pendingProps),Ao(e,t,l,n,a);case 3:e:{if(Zn(t,t.stateNode.containerInfo),e===null)throw Error(y(387));l=t.pendingProps;var i=t.memoizedState;n=i.element,$c(e,t),Dl(t,l,null,a);var s=t.memoizedState;if(l=s.cache,Ct(t,ue,l),l!==i.cache&&Kc(t,[ue],a,!0),Cl(),l=s.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=To(e,t,l,a);break e}else if(l!==n){n=Ke(Error(y(424)),t),Xl(n),t=To(e,t,l,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(F=We(e.firstChild),xe=t,k=!0,qt=null,Je=!0,a=gf(t,null,l,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(fa(),l===n){t=St(e,t,a);break e}ge(e,t,l,a)}t=t.child}return t;case 26:return Yn(e,t),e===null?(a=Jo(t.type,null,t.pendingProps,null))?t.memoizedState=a:k||(a=t.type,e=t.pendingProps,l=pi(Yt.current).createElement(a),l[ve]=t,l[Oe]=e,be(l,a,e),pe(l),t.stateNode=l):t.memoizedState=Jo(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Rc(t),e===null&&k&&(l=t.stateNode=Fd(t.type,t.pendingProps,Yt.current),xe=t,Je=!0,n=F,Pt(t.type)?(ys=n,F=We(l.firstChild)):F=n),ge(e,t,t.pendingProps.children,a),Yn(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&k&&((n=l=F)&&(l=Vh(l,t.type,t.pendingProps,Je),l!==null?(t.stateNode=l,xe=t,F=We(l.firstChild),Je=!1,n=!0):n=!1),n||$t(t)),Rc(t),n=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,l=i.children,hs(n,i)?l=null:s!==null&&hs(n,s)&&(t.flags|=32),t.memoizedState!==null&&(n=Is(e,t,ch,null,null,a),$l._currentValue=n),Yn(e,t),ge(e,t,l,a),t.child;case 6:return e===null&&k&&((e=a=F)&&(a=Zh(a,t.pendingProps,Je),a!==null?(t.stateNode=a,xe=t,F=null,e=!0):e=!1),e||$t(t)),null;case 13:return id(e,t,a);case 4:return Zn(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=ma(t,null,l,a):ge(e,t,l,a),t.child;case 11:return No(e,t,t.type,t.pendingProps,a);case 7:return ge(e,t,t.pendingProps,a),t.child;case 8:return ge(e,t,t.pendingProps.children,a),t.child;case 12:return ge(e,t,t.pendingProps.children,a),t.child;case 10:return l=t.pendingProps,Ct(t,t.type,l.value),ge(e,t,l.children,a),t.child;case 9:return n=t.type._context,l=t.pendingProps.children,da(t),n=ye(n),l=l(n),t.flags|=1,ge(e,t,l,a),t.child;case 14:return jo(e,t,t.type,t.pendingProps,a);case 15:return ld(e,t,t.type,t.pendingProps,a);case 19:return cd(e,t,a);case 31:return ph(e,t,a);case 22:return nd(e,t,a,t.pendingProps);case 24:return da(t),l=ye(ue),e===null?(n=Ks(),n===null&&(n=K,i=Zs(),n.pooledCache=i,i.refCount++,i!==null&&(n.pooledCacheLanes|=a),n=i),t.memoizedState={parent:l,cache:n},$s(t),Ct(t,ue,n)):(e.lanes&a&&($c(e,t),Dl(t,null,null,a),Cl()),n=e.memoizedState,i=t.memoizedState,n.parent!==l?(n={parent:l,cache:l},t.memoizedState=n,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=n),Ct(t,ue,l)):(l=i.cache,Ct(t,ue,l),l!==n.cache&&Kc(t,[ue],a,!0))),ge(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(y(156,t.tag))}function ut(e){e.flags|=4}function dc(e,t,a,l,n){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(n&335544128)===n)if(e.stateNode.complete)e.flags|=8192;else if(Dd())e.flags|=8192;else throw oa=ei,Js}else e.flags&=-16777217}function Oo(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!em(t))if(Dd())e.flags|=8192;else throw oa=ei,Js}function zn(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Dr():536870912,e.lanes|=t,Pa|=t)}function gl(e,t){if(!k)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function W(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,l=0;if(t)for(var n=e.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags&65011712,l|=n.flags&65011712,n.return=e,n=n.sibling;else for(n=e.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags,l|=n.flags,n.return=e,n=n.sibling;return e.subtreeFlags|=l,e.childLanes=a,t}function gh(e,t,a){var l=t.pendingProps;switch(Vs(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(t),null;case 1:return W(t),null;case 3:return a=t.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),xt(ue),Ka(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ja(t)?ut(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,lc())),W(t),null;case 26:var n=t.type,i=t.memoizedState;return e===null?(ut(t),i!==null?(W(t),Oo(t,i)):(W(t),dc(t,n,null,l,a))):i?i!==e.memoizedState?(ut(t),W(t),Oo(t,i)):(W(t),t.flags&=-16777217):(e=e.memoizedProps,e!==l&&ut(t),W(t),dc(t,n,e,l,a)),null;case 27:if(Kn(t),a=Yt.current,n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&ut(t);else{if(!l){if(t.stateNode===null)throw Error(y(166));return W(t),null}e=nt.current,ja(t)?lo(t):(e=Fd(n,l,a),t.stateNode=e,ut(t))}return W(t),null;case 5:if(Kn(t),n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&ut(t);else{if(!l){if(t.stateNode===null)throw Error(y(166));return W(t),null}if(i=nt.current,ja(t))lo(t);else{var s=pi(Yt.current);switch(i){case 1:i=s.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:i=s.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":i=s.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":i=s.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":i=s.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?s.createElement("select",{is:l.is}):s.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?s.createElement(n,{is:l.is}):s.createElement(n)}}i[ve]=t,i[Oe]=l;e:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)i.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;s.sibling===null;){if(s.return===null||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=i;e:switch(be(i,n,l),n){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}l&&ut(t)}}return W(t),dc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==l&&ut(t);else{if(typeof l!="string"&&t.stateNode===null)throw Error(y(166));if(e=Yt.current,ja(t)){if(e=t.stateNode,a=t.memoizedProps,l=null,n=xe,n!==null)switch(n.tag){case 27:case 5:l=n.memoizedProps}e[ve]=t,e=!!(e.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||Kd(e.nodeValue,a)),e||$t(t,!0)}else e=pi(e).createTextNode(l),e[ve]=t,t.stateNode=e}return W(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(l=ja(t),a!==null){if(e===null){if(!l)throw Error(y(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(y(557));e[ve]=t}else fa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;W(t),e=!1}else a=lc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(_e(t),t):(_e(t),null);if(t.flags&128)throw Error(y(558))}return W(t),null;case 13:if(l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(n=ja(t),l!==null&&l.dehydrated!==null){if(e===null){if(!n)throw Error(y(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(y(317));n[ve]=t}else fa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;W(t),n=!1}else n=lc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),n=!0;if(!n)return t.flags&256?(_e(t),t):(_e(t),null)}return _e(t),t.flags&128?(t.lanes=a,t):(a=l!==null,e=e!==null&&e.memoizedState!==null,a&&(l=t.child,n=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(n=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==n&&(l.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),zn(t,t.updateQueue),W(t),null);case 4:return Ka(),e===null&&xu(t.stateNode.containerInfo),W(t),null;case 10:return xt(t.type),W(t),null;case 19:if(he(ne),l=t.memoizedState,l===null)return W(t),null;if(n=(t.flags&128)!==0,i=l.rendering,i===null)if(n)gl(l,!1);else{if(ae!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=ai(e),i!==null){for(t.flags|=128,gl(l,!1),e=i.updateQueue,t.updateQueue=e,zn(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)uf(a,e),a=a.sibling;return $(ne,ne.current&1|2),k&&dt(t,l.treeForkCount),t.child}e=e.sibling}l.tail!==null&&He()>ui&&(t.flags|=128,n=!0,gl(l,!1),t.lanes=4194304)}else{if(!n)if(e=ai(i),e!==null){if(t.flags|=128,n=!0,e=e.updateQueue,t.updateQueue=e,zn(t,e),gl(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!k)return W(t),null}else 2*He()-l.renderingStartTime>ui&&a!==536870912&&(t.flags|=128,n=!0,gl(l,!1),t.lanes=4194304);l.isBackwards?(i.sibling=t.child,t.child=i):(e=l.last,e!==null?e.sibling=i:t.child=i,l.last=i)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=He(),e.sibling=null,a=ne.current,$(ne,n?a&1|2:a&1),k&&dt(t,l.treeForkCount),e):(W(t),null);case 22:case 23:return _e(t),Ws(),l=t.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?a&536870912&&!(t.flags&128)&&(W(t),t.subtreeFlags&6&&(t.flags|=8192)):W(t),a=t.updateQueue,a!==null&&zn(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==a&&(t.flags|=2048),e!==null&&he(ua),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),xt(ue),W(t),null;case 25:return null;case 30:return null}throw Error(y(156,t.tag))}function vh(e,t){switch(Vs(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return xt(ue),Ka(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Kn(t),null;case 31:if(t.memoizedState!==null){if(_e(t),t.alternate===null)throw Error(y(340));fa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(_e(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(y(340));fa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return he(ne),null;case 4:return Ka(),null;case 10:return xt(t.type),null;case 22:case 23:return _e(t),Ws(),e!==null&&he(ua),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return xt(ue),null;case 25:return null;default:return null}}function ud(e,t){switch(Vs(t),t.tag){case 3:xt(ue),Ka();break;case 26:case 27:case 5:Kn(t);break;case 4:Ka();break;case 31:t.memoizedState!==null&&_e(t);break;case 13:_e(t);break;case 19:he(ne);break;case 10:xt(t.type);break;case 22:case 23:_e(t),Ws(),e!==null&&he(ua);break;case 24:xt(ue)}}function sn(e,t){try{var a=t.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var n=l.next;a=n;do{if((a.tag&e)===e){l=void 0;var i=a.create,s=a.inst;l=i(),s.destroy=l}a=a.next}while(a!==n)}}catch(u){X(t,t.return,u)}}function Wt(e,t,a){try{var l=t.updateQueue,n=l!==null?l.lastEffect:null;if(n!==null){var i=n.next;l=i;do{if((l.tag&e)===e){var s=l.inst,u=s.destroy;if(u!==void 0){s.destroy=void 0,n=t;var o=a,d=u;try{d()}catch(g){X(n,o,g)}}}l=l.next}while(l!==i)}}catch(g){X(t,t.return,g)}}function od(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{xf(t,a)}catch(l){X(e,e.return,l)}}}function rd(e,t,a){a.props=ha(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(l){X(e,t,l)}}function Rl(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof a=="function"?e.refCleanup=a(l):a.current=l}}catch(n){X(e,t,n)}}function lt(e,t){var a=e.ref,l=e.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(n){X(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(n){X(e,t,n)}else a.current=null}function fd(e){var t=e.type,a=e.memoizedProps,l=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break e;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(n){X(e,e.return,n)}}function mc(e,t,a){try{var l=e.stateNode;Yh(l,e.type,a,t),l[Oe]=t}catch(n){X(e,e.return,n)}}function dd(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Pt(e.type)||e.tag===4}function pc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||dd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Pt(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function cs(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=ht));else if(l!==4&&(l===27&&Pt(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(cs(e,t,a),e=e.sibling;e!==null;)cs(e,t,a),e=e.sibling}function si(e,t,a){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(l!==4&&(l===27&&Pt(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(si(e,t,a),e=e.sibling;e!==null;)si(e,t,a),e=e.sibling}function md(e){var t=e.stateNode,a=e.memoizedProps;try{for(var l=e.type,n=t.attributes;n.length;)t.removeAttributeNode(n[0]);be(t,l,a),t[ve]=e,t[Oe]=a}catch(i){X(e,e.return,i)}}var mt=!1,se=!1,hc=!1,Co=typeof WeakSet=="function"?WeakSet:Set,me=null;function xh(e,t){if(e=e.containerInfo,ms=xi,e=Pr(e),qs(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var n=l.anchorOffset,i=l.focusNode;l=l.focusOffset;try{a.nodeType,i.nodeType}catch{a=null;break e}var s=0,u=-1,o=-1,d=0,g=0,v=e,f=null;t:for(;;){for(var h;v!==a||n!==0&&v.nodeType!==3||(u=s+n),v!==i||l!==0&&v.nodeType!==3||(o=s+l),v.nodeType===3&&(s+=v.nodeValue.length),(h=v.firstChild)!==null;)f=v,v=h;for(;;){if(v===e)break t;if(f===a&&++d===n&&(u=s),f===i&&++g===l&&(o=s),(h=v.nextSibling)!==null)break;v=f,f=v.parentNode}v=h}a=u===-1||o===-1?null:{start:u,end:o}}else a=null}a=a||{start:0,end:0}}else a=null;for(ps={focusedElem:e,selectionRange:a},xi=!1,me=t;me!==null;)if(t=me,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,me=e;else for(;me!==null;){switch(t=me,i=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)n=e[a],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&i!==null){e=void 0,a=t,n=i.memoizedProps,i=i.memoizedState,l=a.stateNode;try{var b=ha(a.type,n);e=l.getSnapshotBeforeUpdate(b,i),l.__reactInternalSnapshotBeforeUpdate=e}catch(S){X(a,a.return,S)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)gs(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":gs(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(y(163))}if(e=t.sibling,e!==null){e.return=t.return,me=e;break}me=t.return}}function pd(e,t,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:rt(e,a),l&4&&sn(5,a);break;case 1:if(rt(e,a),l&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(s){X(a,a.return,s)}else{var n=ha(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(n,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){X(a,a.return,s)}}l&64&&od(a),l&512&&Rl(a,a.return);break;case 3:if(rt(e,a),l&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{xf(e,t)}catch(s){X(a,a.return,s)}}break;case 27:t===null&&l&4&&md(a);case 26:case 5:rt(e,a),t===null&&l&4&&fd(a),l&512&&Rl(a,a.return);break;case 12:rt(e,a);break;case 31:rt(e,a),l&4&&vd(e,a);break;case 13:rt(e,a),l&4&&xd(e,a),l&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Th.bind(null,a),Kh(e,a))));break;case 22:if(l=a.memoizedState!==null||mt,!l){t=t!==null&&t.memoizedState!==null||se,n=mt;var i=se;mt=l,(se=t)&&!i?ft(e,a,(a.subtreeFlags&8772)!==0):rt(e,a),mt=n,se=i}break;case 30:break;default:rt(e,a)}}function hd(e){var t=e.alternate;t!==null&&(e.alternate=null,hd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Us(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ee=null,Ae=!1;function ot(e,t,a){for(a=a.child;a!==null;)gd(e,t,a),a=a.sibling}function gd(e,t,a){if(we&&typeof we.onCommitFiberUnmount=="function")try{we.onCommitFiberUnmount(Pl,a)}catch{}switch(a.tag){case 26:se||lt(a,t),ot(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:se||lt(a,t);var l=ee,n=Ae;Pt(a.type)&&(ee=a.stateNode,Ae=!1),ot(e,t,a),Bl(a.stateNode),ee=l,Ae=n;break;case 5:se||lt(a,t);case 6:if(l=ee,n=Ae,ee=null,ot(e,t,a),ee=l,Ae=n,ee!==null)if(Ae)try{(ee.nodeType===9?ee.body:ee.nodeName==="HTML"?ee.ownerDocument.body:ee).removeChild(a.stateNode)}catch(i){X(a,t,i)}else try{ee.removeChild(a.stateNode)}catch(i){X(a,t,i)}break;case 18:ee!==null&&(Ae?(e=ee,Xo(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),ll(e)):Xo(ee,a.stateNode));break;case 4:l=ee,n=Ae,ee=a.stateNode.containerInfo,Ae=!0,ot(e,t,a),ee=l,Ae=n;break;case 0:case 11:case 14:case 15:Wt(2,a,t),se||Wt(4,a,t),ot(e,t,a);break;case 1:se||(lt(a,t),l=a.stateNode,typeof l.componentWillUnmount=="function"&&rd(a,t,l)),ot(e,t,a);break;case 21:ot(e,t,a);break;case 22:se=(l=se)||a.memoizedState!==null,ot(e,t,a),se=l;break;default:ot(e,t,a)}}function vd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ll(e)}catch(a){X(t,t.return,a)}}}function xd(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ll(e)}catch(a){X(t,t.return,a)}}function yh(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Co),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Co),t;default:throw Error(y(435,e.tag))}}function En(e,t){var a=yh(e);t.forEach(function(l){if(!a.has(l)){a.add(l);var n=Mh.bind(null,e,l);l.then(n,n)}})}function ze(e,t){var a=t.deletions;if(a!==null)for(var l=0;l<a.length;l++){var n=a[l],i=e,s=t,u=s;e:for(;u!==null;){switch(u.tag){case 27:if(Pt(u.type)){ee=u.stateNode,Ae=!1;break e}break;case 5:ee=u.stateNode,Ae=!1;break e;case 3:case 4:ee=u.stateNode.containerInfo,Ae=!0;break e}u=u.return}if(ee===null)throw Error(y(160));gd(i,s,n),ee=null,Ae=!1,i=n.alternate,i!==null&&(i.return=null),n.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)yd(t,e),t=t.sibling}var Pe=null;function yd(e,t){var a=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ze(t,e),Ee(e),l&4&&(Wt(3,e,e.return),sn(3,e),Wt(5,e,e.return));break;case 1:ze(t,e),Ee(e),l&512&&(se||a===null||lt(a,a.return)),l&64&&mt&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var n=Pe;if(ze(t,e),Ee(e),l&512&&(se||a===null||lt(a,a.return)),l&4){var i=a!==null?a.memoizedState:null;if(l=e.memoizedState,a===null)if(l===null)if(e.stateNode===null){e:{l=e.type,a=e.memoizedProps,n=n.ownerDocument||n;t:switch(l){case"title":i=n.getElementsByTagName("title")[0],(!i||i[an]||i[ve]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=n.createElement(l),n.head.insertBefore(i,n.querySelector("head > title"))),be(i,l,a),i[ve]=e,pe(i),l=i;break e;case"link":var s=Wo("link","href",n).get(l+(a.href||""));if(s){for(var u=0;u<s.length;u++)if(i=s[u],i.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&i.getAttribute("rel")===(a.rel==null?null:a.rel)&&i.getAttribute("title")===(a.title==null?null:a.title)&&i.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){s.splice(u,1);break t}}i=n.createElement(l),be(i,l,a),n.head.appendChild(i);break;case"meta":if(s=Wo("meta","content",n).get(l+(a.content||""))){for(u=0;u<s.length;u++)if(i=s[u],i.getAttribute("content")===(a.content==null?null:""+a.content)&&i.getAttribute("name")===(a.name==null?null:a.name)&&i.getAttribute("property")===(a.property==null?null:a.property)&&i.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&i.getAttribute("charset")===(a.charSet==null?null:a.charSet)){s.splice(u,1);break t}}i=n.createElement(l),be(i,l,a),n.head.appendChild(i);break;default:throw Error(y(468,l))}i[ve]=e,pe(i),l=i}e.stateNode=l}else Fo(n,e.type,e.stateNode);else e.stateNode=$o(n,l,e.memoizedProps);else i!==l?(i===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):i.count--,l===null?Fo(n,e.type,e.stateNode):$o(n,l,e.memoizedProps)):l===null&&e.stateNode!==null&&mc(e,e.memoizedProps,a.memoizedProps)}break;case 27:ze(t,e),Ee(e),l&512&&(se||a===null||lt(a,a.return)),a!==null&&l&4&&mc(e,e.memoizedProps,a.memoizedProps);break;case 5:if(ze(t,e),Ee(e),l&512&&(se||a===null||lt(a,a.return)),e.flags&32){n=e.stateNode;try{$a(n,"")}catch(b){X(e,e.return,b)}}l&4&&e.stateNode!=null&&(n=e.memoizedProps,mc(e,n,a!==null?a.memoizedProps:n)),l&1024&&(hc=!0);break;case 6:if(ze(t,e),Ee(e),l&4){if(e.stateNode===null)throw Error(y(162));l=e.memoizedProps,a=e.stateNode;try{a.nodeValue=l}catch(b){X(e,e.return,b)}}break;case 3:if(Gn=null,n=Pe,Pe=hi(t.containerInfo),ze(t,e),Pe=n,Ee(e),l&4&&a!==null&&a.memoizedState.isDehydrated)try{ll(t.containerInfo)}catch(b){X(e,e.return,b)}hc&&(hc=!1,bd(e));break;case 4:l=Pe,Pe=hi(e.stateNode.containerInfo),ze(t,e),Ee(e),Pe=l;break;case 12:ze(t,e),Ee(e);break;case 31:ze(t,e),Ee(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,En(e,l)));break;case 13:ze(t,e),Ee(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Hi=He()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,En(e,l)));break;case 22:n=e.memoizedState!==null;var o=a!==null&&a.memoizedState!==null,d=mt,g=se;if(mt=d||n,se=g||o,ze(t,e),se=g,mt=d,Ee(e),l&8192)e:for(t=e.stateNode,t._visibility=n?t._visibility&-2:t._visibility|1,n&&(a===null||o||mt||se||ia(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){o=a=t;try{if(i=o.stateNode,n)s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{u=o.stateNode;var v=o.memoizedProps.style,f=v!=null&&v.hasOwnProperty("display")?v.display:null;u.style.display=f==null||typeof f=="boolean"?"":(""+f).trim()}}catch(b){X(o,o.return,b)}}}else if(t.tag===6){if(a===null){o=t;try{o.stateNode.nodeValue=n?"":o.memoizedProps}catch(b){X(o,o.return,b)}}}else if(t.tag===18){if(a===null){o=t;try{var h=o.stateNode;n?Qo(h,!0):Qo(o.stateNode,!1)}catch(b){X(o,o.return,b)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}l&4&&(l=e.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,En(e,a))));break;case 19:ze(t,e),Ee(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,En(e,l)));break;case 30:break;case 21:break;default:ze(t,e),Ee(e)}}function Ee(e){var t=e.flags;if(t&2){try{for(var a,l=e.return;l!==null;){if(dd(l)){a=l;break}l=l.return}if(a==null)throw Error(y(160));switch(a.tag){case 27:var n=a.stateNode,i=pc(e);si(e,i,n);break;case 5:var s=a.stateNode;a.flags&32&&($a(s,""),a.flags&=-33);var u=pc(e);si(e,u,s);break;case 3:case 4:var o=a.stateNode.containerInfo,d=pc(e);cs(e,d,o);break;default:throw Error(y(161))}}catch(g){X(e,e.return,g)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function bd(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;bd(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function rt(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)pd(e,t.alternate,t),t=t.sibling}function ia(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Wt(4,t,t.return),ia(t);break;case 1:lt(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&rd(t,t.return,a),ia(t);break;case 27:Bl(t.stateNode);case 26:case 5:lt(t,t.return),ia(t);break;case 22:t.memoizedState===null&&ia(t);break;case 30:ia(t);break;default:ia(t)}e=e.sibling}}function ft(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var l=t.alternate,n=e,i=t,s=i.flags;switch(i.tag){case 0:case 11:case 15:ft(n,i,a),sn(4,i);break;case 1:if(ft(n,i,a),l=i,n=l.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(d){X(l,l.return,d)}if(l=i,n=l.updateQueue,n!==null){var u=l.stateNode;try{var o=n.shared.hiddenCallbacks;if(o!==null)for(n.shared.hiddenCallbacks=null,n=0;n<o.length;n++)vf(o[n],u)}catch(d){X(l,l.return,d)}}a&&s&64&&od(i),Rl(i,i.return);break;case 27:md(i);case 26:case 5:ft(n,i,a),a&&l===null&&s&4&&fd(i),Rl(i,i.return);break;case 12:ft(n,i,a);break;case 31:ft(n,i,a),a&&s&4&&vd(n,i);break;case 13:ft(n,i,a),a&&s&4&&xd(n,i);break;case 22:i.memoizedState===null&&ft(n,i,a),Rl(i,i.return);break;case 30:break;default:ft(n,i,a)}t=t.sibling}}function du(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&nn(a))}function mu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&nn(e))}function Ie(e,t,a,l){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Nd(e,t,a,l),t=t.sibling}function Nd(e,t,a,l){var n=t.flags;switch(t.tag){case 0:case 11:case 15:Ie(e,t,a,l),n&2048&&sn(9,t);break;case 1:Ie(e,t,a,l);break;case 3:Ie(e,t,a,l),n&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&nn(e)));break;case 12:if(n&2048){Ie(e,t,a,l),e=t.stateNode;try{var i=t.memoizedProps,s=i.id,u=i.onPostCommit;typeof u=="function"&&u(s,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(o){X(t,t.return,o)}}else Ie(e,t,a,l);break;case 31:Ie(e,t,a,l);break;case 13:Ie(e,t,a,l);break;case 23:break;case 22:i=t.stateNode,s=t.alternate,t.memoizedState!==null?i._visibility&2?Ie(e,t,a,l):Ul(e,t):i._visibility&2?Ie(e,t,a,l):(i._visibility|=2,Aa(e,t,a,l,(t.subtreeFlags&10256)!==0||!1)),n&2048&&du(s,t);break;case 24:Ie(e,t,a,l),n&2048&&mu(t.alternate,t);break;default:Ie(e,t,a,l)}}function Aa(e,t,a,l,n){for(n=n&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,s=t,u=a,o=l,d=s.flags;switch(s.tag){case 0:case 11:case 15:Aa(i,s,u,o,n),sn(8,s);break;case 23:break;case 22:var g=s.stateNode;s.memoizedState!==null?g._visibility&2?Aa(i,s,u,o,n):Ul(i,s):(g._visibility|=2,Aa(i,s,u,o,n)),n&&d&2048&&du(s.alternate,s);break;case 24:Aa(i,s,u,o,n),n&&d&2048&&mu(s.alternate,s);break;default:Aa(i,s,u,o,n)}t=t.sibling}}function Ul(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,l=t,n=l.flags;switch(l.tag){case 22:Ul(a,l),n&2048&&du(l.alternate,l);break;case 24:Ul(a,l),n&2048&&mu(l.alternate,l);break;default:Ul(a,l)}t=t.sibling}}var Sl=8192;function Sa(e,t,a){if(e.subtreeFlags&Sl)for(e=e.child;e!==null;)jd(e,t,a),e=e.sibling}function jd(e,t,a){switch(e.tag){case 26:Sa(e,t,a),e.flags&Sl&&e.memoizedState!==null&&i0(a,Pe,e.memoizedState,e.memoizedProps);break;case 5:Sa(e,t,a);break;case 3:case 4:var l=Pe;Pe=hi(e.stateNode.containerInfo),Sa(e,t,a),Pe=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=Sl,Sl=16777216,Sa(e,t,a),Sl=l):Sa(e,t,a));break;default:Sa(e,t,a)}}function Sd(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function vl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];me=l,Ed(l,e)}Sd(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)zd(e),e=e.sibling}function zd(e){switch(e.tag){case 0:case 11:case 15:vl(e),e.flags&2048&&Wt(9,e,e.return);break;case 3:vl(e);break;case 12:vl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,qn(e)):vl(e);break;default:vl(e)}}function qn(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var a=0;a<t.length;a++){var l=t[a];me=l,Ed(l,e)}Sd(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Wt(8,t,t.return),qn(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,qn(t));break;default:qn(t)}e=e.sibling}}function Ed(e,t){for(;me!==null;){var a=me;switch(a.tag){case 0:case 11:case 15:Wt(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:nn(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,me=l;else e:for(a=e;me!==null;){l=me;var n=l.sibling,i=l.return;if(hd(l),l===a){me=null;break e}if(n!==null){n.return=i,me=n;break e}me=i}}}var bh={getCacheForType:function(e){var t=ye(ue),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return ye(ue).controller.signal}},Nh=typeof WeakMap=="function"?WeakMap:Map,q=0,K=null,U=null,w=0,G=0,De=null,wt=!1,ol=!1,pu=!1,zt=0,ae=0,Ft=0,ra=0,hu=0,Ue=0,Pa=0,Hl=null,Te=null,ss=!1,Hi=0,Ad=0,ui=1/0,oi=null,Xt=null,re=0,Qt=null,el=null,yt=0,us=0,os=null,Td=null,wl=0,rs=null;function ke(){return q&2&&w!==0?w&-w:E.T!==null?vu():Hr()}function Md(){if(Ue===0)if(!(w&536870912)||k){var e=vn;vn<<=1,!(vn&3932160)&&(vn=262144),Ue=e}else Ue=536870912;return e=qe.current,e!==null&&(e.flags|=32),Ue}function Me(e,t,a){(e===K&&(G===2||G===9)||e.cancelPendingCommit!==null)&&(tl(e,0),Bt(e,w,Ue,!1)),tn(e,a),(!(q&2)||e!==K)&&(e===K&&(!(q&2)&&(ra|=a),ae===4&&Bt(e,w,Ue,!1)),ct(e))}function Od(e,t,a){if(q&6)throw Error(y(327));var l=!a&&(t&127)===0&&(t&e.expiredLanes)===0||en(e,t),n=l?zh(e,t):gc(e,t,!0),i=l;do{if(n===0){ol&&!l&&Bt(e,t,0,!1);break}else{if(a=e.current.alternate,i&&!jh(a)){n=gc(e,t,!1),i=!1;continue}if(n===2){if(i=t,e.errorRecoveryDisabledLanes&i)var s=0;else s=e.pendingLanes&-536870913,s=s!==0?s:s&536870912?536870912:0;if(s!==0){t=s;e:{var u=e;n=Hl;var o=u.current.memoizedState.isDehydrated;if(o&&(tl(u,s).flags|=256),s=gc(u,s,!1),s!==2){if(pu&&!o){u.errorRecoveryDisabledLanes|=i,ra|=i,n=4;break e}i=Te,Te=n,i!==null&&(Te===null?Te=i:Te.push.apply(Te,i))}n=s}if(i=!1,n!==2)continue}}if(n===1){tl(e,0),Bt(e,t,0,!0);break}e:{switch(l=e,i=n,i){case 0:case 1:throw Error(y(345));case 4:if((t&4194048)!==t)break;case 6:Bt(l,t,Ue,!wt);break e;case 2:Te=null;break;case 3:case 5:break;default:throw Error(y(329))}if((t&62914560)===t&&(n=Hi+300-He(),10<n)){if(Bt(l,t,Ue,!wt),zi(l,0,!0)!==0)break e;yt=t,l.timeoutHandle=$d(Do.bind(null,l,a,Te,oi,ss,t,Ue,ra,Pa,wt,i,"Throttled",-0,0),n);break e}Do(l,a,Te,oi,ss,t,Ue,ra,Pa,wt,i,null,-0,0)}}break}while(!0);ct(e)}function Do(e,t,a,l,n,i,s,u,o,d,g,v,f,h){if(e.timeoutHandle=-1,v=t.subtreeFlags,v&8192||(v&16785408)===16785408){v={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ht},jd(t,i,v);var b=(i&62914560)===i?Hi-He():(i&4194048)===i?Ad-He():0;if(b=c0(v,b),b!==null){yt=i,e.cancelPendingCommit=b(Ro.bind(null,e,t,i,a,l,n,s,u,o,g,v,null,f,h)),Bt(e,i,s,!d);return}}Ro(e,t,i,a,l,n,s,u,o)}function jh(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var n=a[l],i=n.getSnapshot;n=n.value;try{if(!Ye(i(),n))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Bt(e,t,a,l){t&=~hu,t&=~ra,e.suspendedLanes|=t,e.pingedLanes&=~t,l&&(e.warmLanes|=t),l=e.expirationTimes;for(var n=t;0<n;){var i=31-Be(n),s=1<<i;l[i]=-1,n&=~s}a!==0&&_r(e,a,t)}function wi(){return q&6?!0:(un(0),!1)}function gu(){if(U!==null){if(G===0)var e=U.return;else e=U,gt=ba=null,tu(e),Qa=null,Ql=0,e=U;for(;e!==null;)ud(e.alternate,e),e=e.return;U=null}}function tl(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,Gh(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),yt=0,gu(),K=e,U=a=vt(e.current,null),w=t,G=0,De=null,wt=!1,ol=en(e,t),pu=!1,Pa=Ue=hu=ra=Ft=ae=0,Te=Hl=null,ss=!1,t&8&&(t|=t&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=t;0<l;){var n=31-Be(l),i=1<<n;t|=e[n],l&=~i}return zt=t,Mi(),a}function Cd(e,t){M=null,E.H=Zl,t===ul||t===Ci?(t=uo(),G=3):t===Js?(t=uo(),G=4):G=t===ru?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,De=t,U===null&&(ae=1,ii(e,Ke(t,e.current)))}function Dd(){var e=qe.current;return e===null?!0:(w&4194048)===w?$e===null:(w&62914560)===w||w&536870912?e===$e:!1}function _d(){var e=E.H;return E.H=Zl,e===null?Zl:e}function Rd(){var e=E.A;return E.A=bh,e}function ri(){ae=4,wt||(w&4194048)!==w&&qe.current!==null||(ol=!0),!(Ft&134217727)&&!(ra&134217727)||K===null||Bt(K,w,Ue,!1)}function gc(e,t,a){var l=q;q|=2;var n=_d(),i=Rd();(K!==e||w!==t)&&(oi=null,tl(e,t)),t=!1;var s=ae;e:do try{if(G!==0&&U!==null){var u=U,o=De;switch(G){case 8:gu(),s=6;break e;case 3:case 2:case 9:case 6:qe.current===null&&(t=!0);var d=G;if(G=0,De=null,Ya(e,u,o,d),a&&ol){s=0;break e}break;default:d=G,G=0,De=null,Ya(e,u,o,d)}}Sh(),s=ae;break}catch(g){Cd(e,g)}while(!0);return t&&e.shellSuspendCounter++,gt=ba=null,q=l,E.H=n,E.A=i,U===null&&(K=null,w=0,Mi()),s}function Sh(){for(;U!==null;)Ud(U)}function zh(e,t){var a=q;q|=2;var l=_d(),n=Rd();K!==e||w!==t?(oi=null,ui=He()+500,tl(e,t)):ol=en(e,t);e:do try{if(G!==0&&U!==null){t=U;var i=De;t:switch(G){case 1:G=0,De=null,Ya(e,t,i,1);break;case 2:case 9:if(so(i)){G=0,De=null,_o(t);break}t=function(){G!==2&&G!==9||K!==e||(G=7),ct(e)},i.then(t,t);break e;case 3:G=7;break e;case 4:G=5;break e;case 7:so(i)?(G=0,De=null,_o(t)):(G=0,De=null,Ya(e,t,i,7));break;case 5:var s=null;switch(U.tag){case 26:s=U.memoizedState;case 5:case 27:var u=U;if(s?em(s):u.stateNode.complete){G=0,De=null;var o=u.sibling;if(o!==null)U=o;else{var d=u.return;d!==null?(U=d,Bi(d)):U=null}break t}}G=0,De=null,Ya(e,t,i,5);break;case 6:G=0,De=null,Ya(e,t,i,6);break;case 8:gu(),ae=6;break e;default:throw Error(y(462))}}Eh();break}catch(g){Cd(e,g)}while(!0);return gt=ba=null,E.H=l,E.A=n,q=a,U!==null?0:(K=null,w=0,Mi(),ae)}function Eh(){for(;U!==null&&!Jm();)Ud(U)}function Ud(e){var t=sd(e.alternate,e,zt);e.memoizedProps=e.pendingProps,t===null?Bi(e):U=t}function _o(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Eo(a,t,t.pendingProps,t.type,void 0,w);break;case 11:t=Eo(a,t,t.pendingProps,t.type.render,t.ref,w);break;case 5:tu(t);default:ud(a,t),t=U=uf(t,zt),t=sd(a,t,zt)}e.memoizedProps=e.pendingProps,t===null?Bi(e):U=t}function Ya(e,t,a,l){gt=ba=null,tu(t),Qa=null,Ql=0;var n=t.return;try{if(mh(e,n,t,a,w)){ae=1,ii(e,Ke(a,e.current)),U=null;return}}catch(i){if(n!==null)throw U=n,i;ae=1,ii(e,Ke(a,e.current)),U=null;return}t.flags&32768?(k||l===1?e=!0:ol||w&536870912?e=!1:(wt=e=!0,(l===2||l===9||l===3||l===6)&&(l=qe.current,l!==null&&l.tag===13&&(l.flags|=16384))),Hd(t,e)):Bi(t)}function Bi(e){var t=e;do{if(t.flags&32768){Hd(t,wt);return}e=t.return;var a=gh(t.alternate,t,zt);if(a!==null){U=a;return}if(t=t.sibling,t!==null){U=t;return}U=t=e}while(t!==null);ae===0&&(ae=5)}function Hd(e,t){do{var a=vh(e.alternate,e);if(a!==null){a.flags&=32767,U=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){U=e;return}U=e=a}while(e!==null);ae=6,U=null}function Ro(e,t,a,l,n,i,s,u,o){e.cancelPendingCommit=null;do ki();while(re!==0);if(q&6)throw Error(y(327));if(t!==null){if(t===e.current)throw Error(y(177));if(i=t.lanes|t.childLanes,i|=Ls,np(e,a,i,s,u,o),e===K&&(U=K=null,w=0),el=t,Qt=e,yt=a,us=i,os=n,Td=l,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Oh(Jn,function(){return qd(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(t.flags&13878)!==0,t.subtreeFlags&13878||l){l=E.T,E.T=null,n=L.p,L.p=2,s=q,q|=4;try{xh(e,t,a)}finally{q=s,L.p=n,E.T=l}}re=1,wd(),Bd(),kd()}}function wd(){if(re===1){re=0;var e=Qt,t=el,a=(t.flags&13878)!==0;if(t.subtreeFlags&13878||a){a=E.T,E.T=null;var l=L.p;L.p=2;var n=q;q|=4;try{yd(t,e);var i=ps,s=Pr(e.containerInfo),u=i.focusedElem,o=i.selectionRange;if(s!==u&&u&&u.ownerDocument&&Ir(u.ownerDocument.documentElement,u)){if(o!==null&&qs(u)){var d=o.start,g=o.end;if(g===void 0&&(g=d),"selectionStart"in u)u.selectionStart=d,u.selectionEnd=Math.min(g,u.value.length);else{var v=u.ownerDocument||document,f=v&&v.defaultView||window;if(f.getSelection){var h=f.getSelection(),b=u.textContent.length,S=Math.min(o.start,b),H=o.end===void 0?S:Math.min(o.end,b);!h.extend&&S>H&&(s=H,H=S,S=s);var m=eo(u,S),r=eo(u,H);if(m&&r&&(h.rangeCount!==1||h.anchorNode!==m.node||h.anchorOffset!==m.offset||h.focusNode!==r.node||h.focusOffset!==r.offset)){var p=v.createRange();p.setStart(m.node,m.offset),h.removeAllRanges(),S>H?(h.addRange(p),h.extend(r.node,r.offset)):(p.setEnd(r.node,r.offset),h.addRange(p))}}}}for(v=[],h=u;h=h.parentNode;)h.nodeType===1&&v.push({element:h,left:h.scrollLeft,top:h.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<v.length;u++){var x=v[u];x.element.scrollLeft=x.left,x.element.scrollTop=x.top}}xi=!!ms,ps=ms=null}finally{q=n,L.p=l,E.T=a}}e.current=t,re=2}}function Bd(){if(re===2){re=0;var e=Qt,t=el,a=(t.flags&8772)!==0;if(t.subtreeFlags&8772||a){a=E.T,E.T=null;var l=L.p;L.p=2;var n=q;q|=4;try{pd(e,t.alternate,t)}finally{q=n,L.p=l,E.T=a}}re=3}}function kd(){if(re===4||re===3){re=0,$m();var e=Qt,t=el,a=yt,l=Td;t.subtreeFlags&10256||t.flags&10256?re=5:(re=0,el=Qt=null,Yd(e,e.pendingLanes));var n=e.pendingLanes;if(n===0&&(Xt=null),Rs(a),t=t.stateNode,we&&typeof we.onCommitFiberRoot=="function")try{we.onCommitFiberRoot(Pl,t,void 0,(t.current.flags&128)===128)}catch{}if(l!==null){t=E.T,n=L.p,L.p=2,E.T=null;try{for(var i=e.onRecoverableError,s=0;s<l.length;s++){var u=l[s];i(u.value,{componentStack:u.stack})}}finally{E.T=t,L.p=n}}yt&3&&ki(),ct(e),n=e.pendingLanes,a&261930&&n&42?e===rs?wl++:(wl=0,rs=e):wl=0,un(0)}}function Yd(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,nn(t)))}function ki(){return wd(),Bd(),kd(),qd()}function qd(){if(re!==5)return!1;var e=Qt,t=us;us=0;var a=Rs(yt),l=E.T,n=L.p;try{L.p=32>a?32:a,E.T=null,a=os,os=null;var i=Qt,s=yt;if(re=0,el=Qt=null,yt=0,q&6)throw Error(y(331));var u=q;if(q|=4,zd(i.current),Nd(i,i.current,s,a),q=u,un(0,!1),we&&typeof we.onPostCommitFiberRoot=="function")try{we.onPostCommitFiberRoot(Pl,i)}catch{}return!0}finally{L.p=n,E.T=l,Yd(e,t)}}function Uo(e,t,a){t=Ke(a,t),t=ls(e.stateNode,t,2),e=Gt(e,t,2),e!==null&&(tn(e,2),ct(e))}function X(e,t,a){if(e.tag===3)Uo(e,e,a);else for(;t!==null;){if(t.tag===3){Uo(t,e,a);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Xt===null||!Xt.has(l))){e=Ke(a,e),a=td(2),l=Gt(t,a,2),l!==null&&(ad(a,l,t,e),tn(l,2),ct(l));break}}t=t.return}}function vc(e,t,a){var l=e.pingCache;if(l===null){l=e.pingCache=new Nh;var n=new Set;l.set(t,n)}else n=l.get(t),n===void 0&&(n=new Set,l.set(t,n));n.has(a)||(pu=!0,n.add(a),e=Ah.bind(null,e,t,a),t.then(e,e))}function Ah(e,t,a){var l=e.pingCache;l!==null&&l.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,K===e&&(w&a)===a&&(ae===4||ae===3&&(w&62914560)===w&&300>He()-Hi?!(q&2)&&tl(e,0):hu|=a,Pa===w&&(Pa=0)),ct(e)}function Ld(e,t){t===0&&(t=Dr()),e=ya(e,t),e!==null&&(tn(e,t),ct(e))}function Th(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Ld(e,a)}function Mh(e,t){var a=0;switch(e.tag){case 31:case 13:var l=e.stateNode,n=e.memoizedState;n!==null&&(a=n.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(y(314))}l!==null&&l.delete(t),Ld(e,a)}function Oh(e,t){return Ds(e,t)}var fi=null,Ta=null,fs=!1,di=!1,xc=!1,kt=0;function ct(e){e!==Ta&&e.next===null&&(Ta===null?fi=Ta=e:Ta=Ta.next=e),di=!0,fs||(fs=!0,Dh())}function un(e,t){if(!xc&&di){xc=!0;do for(var a=!1,l=fi;l!==null;){if(e!==0){var n=l.pendingLanes;if(n===0)var i=0;else{var s=l.suspendedLanes,u=l.pingedLanes;i=(1<<31-Be(42|e)+1)-1,i&=n&~(s&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(a=!0,Ho(l,i))}else i=w,i=zi(l,l===K?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),!(i&3)||en(l,i)||(a=!0,Ho(l,i));l=l.next}while(a);xc=!1}}function Ch(){Gd()}function Gd(){di=fs=!1;var e=0;kt!==0&&Lh()&&(e=kt);for(var t=He(),a=null,l=fi;l!==null;){var n=l.next,i=Xd(l,t);i===0?(l.next=null,a===null?fi=n:a.next=n,n===null&&(Ta=a)):(a=l,(e!==0||i&3)&&(di=!0)),l=n}re!==0&&re!==5||un(e),kt!==0&&(kt=0)}function Xd(e,t){for(var a=e.suspendedLanes,l=e.pingedLanes,n=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var s=31-Be(i),u=1<<s,o=n[s];o===-1?(!(u&a)||u&l)&&(n[s]=lp(u,t)):o<=t&&(e.expiredLanes|=u),i&=~u}if(t=K,a=w,a=zi(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,a===0||e===t&&(G===2||G===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&Zi(l),e.callbackNode=null,e.callbackPriority=0;if(!(a&3)||en(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(l!==null&&Zi(l),Rs(a)){case 2:case 8:a=Or;break;case 32:a=Jn;break;case 268435456:a=Cr;break;default:a=Jn}return l=Qd.bind(null,e),a=Ds(a,l),e.callbackPriority=t,e.callbackNode=a,t}return l!==null&&l!==null&&Zi(l),e.callbackPriority=2,e.callbackNode=null,2}function Qd(e,t){if(re!==0&&re!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(ki()&&e.callbackNode!==a)return null;var l=w;return l=zi(e,e===K?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(Od(e,l,t),Xd(e,He()),e.callbackNode!=null&&e.callbackNode===a?Qd.bind(null,e):null)}function Ho(e,t){if(ki())return null;Od(e,t,!0)}function Dh(){Xh(function(){q&6?Ds(Mr,Ch):Gd()})}function vu(){if(kt===0){var e=Wa;e===0&&(e=gn,gn<<=1,!(gn&261888)&&(gn=256)),kt=e}return kt}function wo(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Dn(""+e)}function Bo(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function _h(e,t,a,l,n){if(t==="submit"&&a&&a.stateNode===n){var i=wo((n[Oe]||null).action),s=l.submitter;s&&(t=(t=s[Oe]||null)?wo(t.formAction):s.getAttribute("formAction"),t!==null&&(i=t,s=null));var u=new Ei("action","action",null,l,n);e.push({event:u,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(kt!==0){var o=s?Bo(n,s):new FormData(n);ts(a,{pending:!0,data:o,method:n.method,action:i},null,o)}}else typeof i=="function"&&(u.preventDefault(),o=s?Bo(n,s):new FormData(n),ts(a,{pending:!0,data:o,method:n.method,action:i},i,o))},currentTarget:n}]})}}for(var yc=0;yc<Xc.length;yc++){var bc=Xc[yc],Rh=bc.toLowerCase(),Uh=bc[0].toUpperCase()+bc.slice(1);et(Rh,"on"+Uh)}et(tf,"onAnimationEnd");et(af,"onAnimationIteration");et(lf,"onAnimationStart");et("dblclick","onDoubleClick");et("focusin","onFocus");et("focusout","onBlur");et(Wp,"onTransitionRun");et(Fp,"onTransitionStart");et(Ip,"onTransitionCancel");et(nf,"onTransitionEnd");Ja("onMouseEnter",["mouseout","mouseover"]);Ja("onMouseLeave",["mouseout","mouseover"]);Ja("onPointerEnter",["pointerout","pointerover"]);Ja("onPointerLeave",["pointerout","pointerover"]);ga("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ga("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ga("onBeforeInput",["compositionend","keypress","textInput","paste"]);ga("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ga("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ga("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Kl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Hh=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Kl));function Vd(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var l=e[a],n=l.event;l=l.listeners;e:{var i=void 0;if(t)for(var s=l.length-1;0<=s;s--){var u=l[s],o=u.instance,d=u.currentTarget;if(u=u.listener,o!==i&&n.isPropagationStopped())break e;i=u,n.currentTarget=d;try{i(n)}catch(g){Wn(g)}n.currentTarget=null,i=o}else for(s=0;s<l.length;s++){if(u=l[s],o=u.instance,d=u.currentTarget,u=u.listener,o!==i&&n.isPropagationStopped())break e;i=u,n.currentTarget=d;try{i(n)}catch(g){Wn(g)}n.currentTarget=null,i=o}}}}function R(e,t){var a=t[Hc];a===void 0&&(a=t[Hc]=new Set);var l=e+"__bubble";a.has(l)||(Zd(t,e,2,!1),a.add(l))}function Nc(e,t,a){var l=0;t&&(l|=4),Zd(a,e,l,t)}var An="_reactListening"+Math.random().toString(36).slice(2);function xu(e){if(!e[An]){e[An]=!0,wr.forEach(function(a){a!=="selectionchange"&&(Hh.has(a)||Nc(a,!1,e),Nc(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[An]||(t[An]=!0,Nc("selectionchange",!1,t))}}function Zd(e,t,a,l){switch(im(t)){case 2:var n=o0;break;case 8:n=r0;break;default:n=ju}a=n.bind(null,t,a,e),n=void 0,!qc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(n=!0),l?n!==void 0?e.addEventListener(t,a,{capture:!0,passive:n}):e.addEventListener(t,a,!0):n!==void 0?e.addEventListener(t,a,{passive:n}):e.addEventListener(t,a,!1)}function jc(e,t,a,l,n){var i=l;if(!(t&1)&&!(t&2)&&l!==null)e:for(;;){if(l===null)return;var s=l.tag;if(s===3||s===4){var u=l.stateNode.containerInfo;if(u===n)break;if(s===4)for(s=l.return;s!==null;){var o=s.tag;if((o===3||o===4)&&s.stateNode.containerInfo===n)return;s=s.return}for(;u!==null;){if(s=Ca(u),s===null)return;if(o=s.tag,o===5||o===6||o===26||o===27){l=i=s;continue e}u=u.parentNode}}l=l.return}Qr(function(){var d=i,g=ws(a),v=[];e:{var f=cf.get(e);if(f!==void 0){var h=Ei,b=e;switch(e){case"keypress":if(Rn(a)===0)break e;case"keydown":case"keyup":h=Mp;break;case"focusin":b="focus",h=Fi;break;case"focusout":b="blur",h=Fi;break;case"beforeblur":case"afterblur":h=Fi;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=Qu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=gp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=Dp;break;case tf:case af:case lf:h=yp;break;case nf:h=Rp;break;case"scroll":case"scrollend":h=pp;break;case"wheel":h=Hp;break;case"copy":case"cut":case"paste":h=Np;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=Zu;break;case"toggle":case"beforetoggle":h=Bp}var S=(t&4)!==0,H=!S&&(e==="scroll"||e==="scrollend"),m=S?f!==null?f+"Capture":null:f;S=[];for(var r=d,p;r!==null;){var x=r;if(p=x.stateNode,x=x.tag,x!==5&&x!==26&&x!==27||p===null||m===null||(x=Yl(r,m),x!=null&&S.push(Jl(r,x,p))),H)break;r=r.return}0<S.length&&(f=new h(f,b,null,a,g),v.push({event:f,listeners:S}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",f&&a!==Yc&&(b=a.relatedTarget||a.fromElement)&&(Ca(b)||b[il]))break e;if((h||f)&&(f=g.window===g?g:(f=g.ownerDocument)?f.defaultView||f.parentWindow:window,h?(b=a.relatedTarget||a.toElement,h=d,b=b?Ca(b):null,b!==null&&(H=Il(b),S=b.tag,b!==H||S!==5&&S!==27&&S!==6)&&(b=null)):(h=null,b=d),h!==b)){if(S=Qu,x="onMouseLeave",m="onMouseEnter",r="mouse",(e==="pointerout"||e==="pointerover")&&(S=Zu,x="onPointerLeave",m="onPointerEnter",r="pointer"),H=h==null?f:Nl(h),p=b==null?f:Nl(b),f=new S(x,r+"leave",h,a,g),f.target=H,f.relatedTarget=p,x=null,Ca(g)===d&&(S=new S(m,r+"enter",b,a,g),S.target=p,S.relatedTarget=H,x=S),H=x,h&&b)t:{for(S=wh,m=h,r=b,p=0,x=m;x;x=S(x))p++;x=0;for(var z=r;z;z=S(z))x++;for(;0<p-x;)m=S(m),p--;for(;0<x-p;)r=S(r),x--;for(;p--;){if(m===r||r!==null&&m===r.alternate){S=m;break t}m=S(m),r=S(r)}S=null}else S=null;h!==null&&ko(v,f,h,S,!1),b!==null&&H!==null&&ko(v,H,b,S,!0)}}e:{if(f=d?Nl(d):window,h=f.nodeName&&f.nodeName.toLowerCase(),h==="select"||h==="input"&&f.type==="file")var O=Wu;else if($u(f))if(Wr)O=Kp;else{O=Vp;var N=Qp}else h=f.nodeName,!h||h.toLowerCase()!=="input"||f.type!=="checkbox"&&f.type!=="radio"?d&&Hs(d.elementType)&&(O=Wu):O=Zp;if(O&&(O=O(e,d))){$r(v,O,a,g);break e}N&&N(e,f,d),e==="focusout"&&d&&f.type==="number"&&d.memoizedProps.value!=null&&kc(f,"number",f.value)}switch(N=d?Nl(d):window,e){case"focusin":($u(N)||N.contentEditable==="true")&&(Ra=N,Lc=d,Tl=null);break;case"focusout":Tl=Lc=Ra=null;break;case"mousedown":Gc=!0;break;case"contextmenu":case"mouseup":case"dragend":Gc=!1,to(v,a,g);break;case"selectionchange":if($p)break;case"keydown":case"keyup":to(v,a,g)}var A;if(Ys)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else _a?Kr(e,a)&&(C="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(C="onCompositionStart");C&&(Zr&&a.locale!=="ko"&&(_a||C!=="onCompositionStart"?C==="onCompositionEnd"&&_a&&(A=Vr()):(Ht=g,Bs="value"in Ht?Ht.value:Ht.textContent,_a=!0)),N=mi(d,C),0<N.length&&(C=new Vu(C,e,null,a,g),v.push({event:C,listeners:N}),A?C.data=A:(A=Jr(a),A!==null&&(C.data=A)))),(A=Yp?qp(e,a):Lp(e,a))&&(C=mi(d,"onBeforeInput"),0<C.length&&(N=new Vu("onBeforeInput","beforeinput",null,a,g),v.push({event:N,listeners:C}),N.data=A)),_h(v,e,d,a,g)}Vd(v,t)})}function Jl(e,t,a){return{instance:e,listener:t,currentTarget:a}}function mi(e,t){for(var a=t+"Capture",l=[];e!==null;){var n=e,i=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||i===null||(n=Yl(e,a),n!=null&&l.unshift(Jl(e,n,i)),n=Yl(e,t),n!=null&&l.push(Jl(e,n,i))),e.tag===3)return l;e=e.return}return[]}function wh(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ko(e,t,a,l,n){for(var i=t._reactName,s=[];a!==null&&a!==l;){var u=a,o=u.alternate,d=u.stateNode;if(u=u.tag,o!==null&&o===l)break;u!==5&&u!==26&&u!==27||d===null||(o=d,n?(d=Yl(a,i),d!=null&&s.unshift(Jl(a,d,o))):n||(d=Yl(a,i),d!=null&&s.push(Jl(a,d,o)))),a=a.return}s.length!==0&&e.push({event:t,listeners:s})}var Bh=/\r\n?/g,kh=/\u0000|\uFFFD/g;function Yo(e){return(typeof e=="string"?e:""+e).replace(Bh,`
`).replace(kh,"")}function Kd(e,t){return t=Yo(t),Yo(e)===t}function Q(e,t,a,l,n,i){switch(a){case"children":typeof l=="string"?t==="body"||t==="textarea"&&l===""||$a(e,l):(typeof l=="number"||typeof l=="bigint")&&t!=="body"&&$a(e,""+l);break;case"className":yn(e,"class",l);break;case"tabIndex":yn(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":yn(e,a,l);break;case"style":Xr(e,l,i);break;case"data":if(t!=="object"){yn(e,"data",l);break}case"src":case"href":if(l===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Dn(""+l),e.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(a==="formAction"?(t!=="input"&&Q(e,t,"name",n.name,n,null),Q(e,t,"formEncType",n.formEncType,n,null),Q(e,t,"formMethod",n.formMethod,n,null),Q(e,t,"formTarget",n.formTarget,n,null)):(Q(e,t,"encType",n.encType,n,null),Q(e,t,"method",n.method,n,null),Q(e,t,"target",n.target,n,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(a);break}l=Dn(""+l),e.setAttribute(a,l);break;case"onClick":l!=null&&(e.onclick=ht);break;case"onScroll":l!=null&&R("scroll",e);break;case"onScrollEnd":l!=null&&R("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(y(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(y(60));e.innerHTML=a}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}a=Dn(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""+l):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":l===!0?e.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(a,l):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(a,l):e.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(a):e.setAttribute(a,l);break;case"popover":R("beforetoggle",e),R("toggle",e),Cn(e,"popover",l);break;case"xlinkActuate":st(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":st(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":st(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":st(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":st(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":st(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":st(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":st(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":st(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Cn(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=dp.get(a)||a,Cn(e,a,l))}}function ds(e,t,a,l,n,i){switch(a){case"style":Xr(e,l,i);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(y(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(y(60));e.innerHTML=a}}break;case"children":typeof l=="string"?$a(e,l):(typeof l=="number"||typeof l=="bigint")&&$a(e,""+l);break;case"onScroll":l!=null&&R("scroll",e);break;case"onScrollEnd":l!=null&&R("scrollend",e);break;case"onClick":l!=null&&(e.onclick=ht);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Br.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(n=a.endsWith("Capture"),t=a.slice(2,n?a.length-7:void 0),i=e[Oe]||null,i=i!=null?i[a]:null,typeof i=="function"&&e.removeEventListener(t,i,n),typeof l=="function")){typeof i!="function"&&i!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,l,n);break e}a in e?e[a]=l:l===!0?e.setAttribute(a,""):Cn(e,a,l)}}}function be(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":R("error",e),R("load",e);var l=!1,n=!1,i;for(i in a)if(a.hasOwnProperty(i)){var s=a[i];if(s!=null)switch(i){case"src":l=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(y(137,t));default:Q(e,t,i,s,a,null)}}n&&Q(e,t,"srcSet",a.srcSet,a,null),l&&Q(e,t,"src",a.src,a,null);return;case"input":R("invalid",e);var u=i=s=n=null,o=null,d=null;for(l in a)if(a.hasOwnProperty(l)){var g=a[l];if(g!=null)switch(l){case"name":n=g;break;case"type":s=g;break;case"checked":o=g;break;case"defaultChecked":d=g;break;case"value":i=g;break;case"defaultValue":u=g;break;case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(y(137,t));break;default:Q(e,t,l,g,a,null)}}qr(e,i,u,o,d,s,n,!1);return;case"select":R("invalid",e),l=s=i=null;for(n in a)if(a.hasOwnProperty(n)&&(u=a[n],u!=null))switch(n){case"value":i=u;break;case"defaultValue":s=u;break;case"multiple":l=u;default:Q(e,t,n,u,a,null)}t=i,a=s,e.multiple=!!l,t!=null?La(e,!!l,t,!1):a!=null&&La(e,!!l,a,!0);return;case"textarea":R("invalid",e),i=n=l=null;for(s in a)if(a.hasOwnProperty(s)&&(u=a[s],u!=null))switch(s){case"value":l=u;break;case"defaultValue":n=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(y(91));break;default:Q(e,t,s,u,a,null)}Gr(e,l,n,i);return;case"option":for(o in a)if(a.hasOwnProperty(o)&&(l=a[o],l!=null))switch(o){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Q(e,t,o,l,a,null)}return;case"dialog":R("beforetoggle",e),R("toggle",e),R("cancel",e),R("close",e);break;case"iframe":case"object":R("load",e);break;case"video":case"audio":for(l=0;l<Kl.length;l++)R(Kl[l],e);break;case"image":R("error",e),R("load",e);break;case"details":R("toggle",e);break;case"embed":case"source":case"link":R("error",e),R("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(d in a)if(a.hasOwnProperty(d)&&(l=a[d],l!=null))switch(d){case"children":case"dangerouslySetInnerHTML":throw Error(y(137,t));default:Q(e,t,d,l,a,null)}return;default:if(Hs(t)){for(g in a)a.hasOwnProperty(g)&&(l=a[g],l!==void 0&&ds(e,t,g,l,a,void 0));return}}for(u in a)a.hasOwnProperty(u)&&(l=a[u],l!=null&&Q(e,t,u,l,a,null))}function Yh(e,t,a,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,i=null,s=null,u=null,o=null,d=null,g=null;for(h in a){var v=a[h];if(a.hasOwnProperty(h)&&v!=null)switch(h){case"checked":break;case"value":break;case"defaultValue":o=v;default:l.hasOwnProperty(h)||Q(e,t,h,null,l,v)}}for(var f in l){var h=l[f];if(v=a[f],l.hasOwnProperty(f)&&(h!=null||v!=null))switch(f){case"type":i=h;break;case"name":n=h;break;case"checked":d=h;break;case"defaultChecked":g=h;break;case"value":s=h;break;case"defaultValue":u=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(y(137,t));break;default:h!==v&&Q(e,t,f,h,l,v)}}Bc(e,s,u,o,d,g,i,n);return;case"select":h=s=u=f=null;for(i in a)if(o=a[i],a.hasOwnProperty(i)&&o!=null)switch(i){case"value":break;case"multiple":h=o;default:l.hasOwnProperty(i)||Q(e,t,i,null,l,o)}for(n in l)if(i=l[n],o=a[n],l.hasOwnProperty(n)&&(i!=null||o!=null))switch(n){case"value":f=i;break;case"defaultValue":u=i;break;case"multiple":s=i;default:i!==o&&Q(e,t,n,i,l,o)}t=u,a=s,l=h,f!=null?La(e,!!a,f,!1):!!l!=!!a&&(t!=null?La(e,!!a,t,!0):La(e,!!a,a?[]:"",!1));return;case"textarea":h=f=null;for(u in a)if(n=a[u],a.hasOwnProperty(u)&&n!=null&&!l.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:Q(e,t,u,null,l,n)}for(s in l)if(n=l[s],i=a[s],l.hasOwnProperty(s)&&(n!=null||i!=null))switch(s){case"value":f=n;break;case"defaultValue":h=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(y(91));break;default:n!==i&&Q(e,t,s,n,l,i)}Lr(e,f,h);return;case"option":for(var b in a)if(f=a[b],a.hasOwnProperty(b)&&f!=null&&!l.hasOwnProperty(b))switch(b){case"selected":e.selected=!1;break;default:Q(e,t,b,null,l,f)}for(o in l)if(f=l[o],h=a[o],l.hasOwnProperty(o)&&f!==h&&(f!=null||h!=null))switch(o){case"selected":e.selected=f&&typeof f!="function"&&typeof f!="symbol";break;default:Q(e,t,o,f,l,h)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var S in a)f=a[S],a.hasOwnProperty(S)&&f!=null&&!l.hasOwnProperty(S)&&Q(e,t,S,null,l,f);for(d in l)if(f=l[d],h=a[d],l.hasOwnProperty(d)&&f!==h&&(f!=null||h!=null))switch(d){case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(y(137,t));break;default:Q(e,t,d,f,l,h)}return;default:if(Hs(t)){for(var H in a)f=a[H],a.hasOwnProperty(H)&&f!==void 0&&!l.hasOwnProperty(H)&&ds(e,t,H,void 0,l,f);for(g in l)f=l[g],h=a[g],!l.hasOwnProperty(g)||f===h||f===void 0&&h===void 0||ds(e,t,g,f,l,h);return}}for(var m in a)f=a[m],a.hasOwnProperty(m)&&f!=null&&!l.hasOwnProperty(m)&&Q(e,t,m,null,l,f);for(v in l)f=l[v],h=a[v],!l.hasOwnProperty(v)||f===h||f==null&&h==null||Q(e,t,v,f,l,h)}function qo(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function qh(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),l=0;l<a.length;l++){var n=a[l],i=n.transferSize,s=n.initiatorType,u=n.duration;if(i&&u&&qo(s)){for(s=0,u=n.responseEnd,l+=1;l<a.length;l++){var o=a[l],d=o.startTime;if(d>u)break;var g=o.transferSize,v=o.initiatorType;g&&qo(v)&&(o=o.responseEnd,s+=g*(o<u?1:(u-d)/(o-d)))}if(--l,t+=8*(i+s)/(n.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ms=null,ps=null;function pi(e){return e.nodeType===9?e:e.ownerDocument}function Lo(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Jd(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function hs(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Sc=null;function Lh(){var e=window.event;return e&&e.type==="popstate"?e===Sc?!1:(Sc=e,!0):(Sc=null,!1)}var $d=typeof setTimeout=="function"?setTimeout:void 0,Gh=typeof clearTimeout=="function"?clearTimeout:void 0,Go=typeof Promise=="function"?Promise:void 0,Xh=typeof queueMicrotask=="function"?queueMicrotask:typeof Go<"u"?function(e){return Go.resolve(null).then(e).catch(Qh)}:$d;function Qh(e){setTimeout(function(){throw e})}function Pt(e){return e==="head"}function Xo(e,t){var a=t,l=0;do{var n=a.nextSibling;if(e.removeChild(a),n&&n.nodeType===8)if(a=n.data,a==="/$"||a==="/&"){if(l===0){e.removeChild(n),ll(t);return}l--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")l++;else if(a==="html")Bl(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Bl(a);for(var i=a.firstChild;i;){var s=i.nextSibling,u=i.nodeName;i[an]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||a.removeChild(i),i=s}}else a==="body"&&Bl(e.ownerDocument.body);a=n}while(a);ll(t)}function Qo(e,t){var a=e;e=0;do{var l=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),l&&l.nodeType===8)if(a=l.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=l}while(a)}function gs(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":gs(a),Us(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Vh(e,t,a,l){for(;e.nodeType===1;){var n=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[an])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==n.rel||e.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||e.getAttribute("title")!==(n.title==null?null:n.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(n.src==null?null:n.src)||e.getAttribute("type")!==(n.type==null?null:n.type)||e.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=n.name==null?null:""+n.name;if(n.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=We(e.nextSibling),e===null)break}return null}function Zh(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=We(e.nextSibling),e===null))return null;return e}function Wd(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=We(e.nextSibling),e===null))return null;return e}function vs(e){return e.data==="$?"||e.data==="$~"}function xs(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Kh(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var l=function(){t(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function We(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var ys=null;function Vo(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return We(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function Zo(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function Fd(e,t,a){switch(t=pi(a),e){case"html":if(e=t.documentElement,!e)throw Error(y(452));return e;case"head":if(e=t.head,!e)throw Error(y(453));return e;case"body":if(e=t.body,!e)throw Error(y(454));return e;default:throw Error(y(451))}}function Bl(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Us(e)}var Fe=new Map,Ko=new Set;function hi(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Et=L.d;L.d={f:Jh,r:$h,D:Wh,C:Fh,L:Ih,m:Ph,X:t0,S:e0,M:a0};function Jh(){var e=Et.f(),t=wi();return e||t}function $h(e){var t=cl(e);t!==null&&t.tag===5&&t.type==="form"?Qf(t):Et.r(e)}var rl=typeof document>"u"?null:document;function Id(e,t,a){var l=rl;if(l&&typeof t=="string"&&t){var n=Ze(t);n='link[rel="'+e+'"][href="'+n+'"]',typeof a=="string"&&(n+='[crossorigin="'+a+'"]'),Ko.has(n)||(Ko.add(n),e={rel:e,crossOrigin:a,href:t},l.querySelector(n)===null&&(t=l.createElement("link"),be(t,"link",e),pe(t),l.head.appendChild(t)))}}function Wh(e){Et.D(e),Id("dns-prefetch",e,null)}function Fh(e,t){Et.C(e,t),Id("preconnect",e,t)}function Ih(e,t,a){Et.L(e,t,a);var l=rl;if(l&&e&&t){var n='link[rel="preload"][as="'+Ze(t)+'"]';t==="image"&&a&&a.imageSrcSet?(n+='[imagesrcset="'+Ze(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(n+='[imagesizes="'+Ze(a.imageSizes)+'"]')):n+='[href="'+Ze(e)+'"]';var i=n;switch(t){case"style":i=al(e);break;case"script":i=fl(e)}Fe.has(i)||(e=P({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),Fe.set(i,e),l.querySelector(n)!==null||t==="style"&&l.querySelector(on(i))||t==="script"&&l.querySelector(rn(i))||(t=l.createElement("link"),be(t,"link",e),pe(t),l.head.appendChild(t)))}}function Ph(e,t){Et.m(e,t);var a=rl;if(a&&e){var l=t&&typeof t.as=="string"?t.as:"script",n='link[rel="modulepreload"][as="'+Ze(l)+'"][href="'+Ze(e)+'"]',i=n;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=fl(e)}if(!Fe.has(i)&&(e=P({rel:"modulepreload",href:e},t),Fe.set(i,e),a.querySelector(n)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(rn(i)))return}l=a.createElement("link"),be(l,"link",e),pe(l),a.head.appendChild(l)}}}function e0(e,t,a){Et.S(e,t,a);var l=rl;if(l&&e){var n=qa(l).hoistableStyles,i=al(e);t=t||"default";var s=n.get(i);if(!s){var u={loading:0,preload:null};if(s=l.querySelector(on(i)))u.loading=5;else{e=P({rel:"stylesheet",href:e,"data-precedence":t},a),(a=Fe.get(i))&&yu(e,a);var o=s=l.createElement("link");pe(o),be(o,"link",e),o._p=new Promise(function(d,g){o.onload=d,o.onerror=g}),o.addEventListener("load",function(){u.loading|=1}),o.addEventListener("error",function(){u.loading|=2}),u.loading|=4,Ln(s,t,l)}s={type:"stylesheet",instance:s,count:1,state:u},n.set(i,s)}}}function t0(e,t){Et.X(e,t);var a=rl;if(a&&e){var l=qa(a).hoistableScripts,n=fl(e),i=l.get(n);i||(i=a.querySelector(rn(n)),i||(e=P({src:e,async:!0},t),(t=Fe.get(n))&&bu(e,t),i=a.createElement("script"),pe(i),be(i,"link",e),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function a0(e,t){Et.M(e,t);var a=rl;if(a&&e){var l=qa(a).hoistableScripts,n=fl(e),i=l.get(n);i||(i=a.querySelector(rn(n)),i||(e=P({src:e,async:!0,type:"module"},t),(t=Fe.get(n))&&bu(e,t),i=a.createElement("script"),pe(i),be(i,"link",e),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function Jo(e,t,a,l){var n=(n=Yt.current)?hi(n):null;if(!n)throw Error(y(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=al(a.href),a=qa(n).hoistableStyles,l=a.get(t),l||(l={type:"style",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=al(a.href);var i=qa(n).hoistableStyles,s=i.get(e);if(s||(n=n.ownerDocument||n,s={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,s),(i=n.querySelector(on(e)))&&!i._p&&(s.instance=i,s.state.loading=5),Fe.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Fe.set(e,a),i||l0(n,e,a,s.state))),t&&l===null)throw Error(y(528,""));return s}if(t&&l!==null)throw Error(y(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=fl(a),a=qa(n).hoistableScripts,l=a.get(t),l||(l={type:"script",instance:null,count:0,state:null},a.set(t,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(y(444,e))}}function al(e){return'href="'+Ze(e)+'"'}function on(e){return'link[rel="stylesheet"]['+e+"]"}function Pd(e){return P({},e,{"data-precedence":e.precedence,precedence:null})}function l0(e,t,a,l){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?l.loading=1:(t=e.createElement("link"),l.preload=t,t.addEventListener("load",function(){return l.loading|=1}),t.addEventListener("error",function(){return l.loading|=2}),be(t,"link",a),pe(t),e.head.appendChild(t))}function fl(e){return'[src="'+Ze(e)+'"]'}function rn(e){return"script[async]"+e}function $o(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var l=e.querySelector('style[data-href~="'+Ze(a.href)+'"]');if(l)return t.instance=l,pe(l),l;var n=P({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),pe(l),be(l,"style",n),Ln(l,a.precedence,e),t.instance=l;case"stylesheet":n=al(a.href);var i=e.querySelector(on(n));if(i)return t.state.loading|=4,t.instance=i,pe(i),i;l=Pd(a),(n=Fe.get(n))&&yu(l,n),i=(e.ownerDocument||e).createElement("link"),pe(i);var s=i;return s._p=new Promise(function(u,o){s.onload=u,s.onerror=o}),be(i,"link",l),t.state.loading|=4,Ln(i,a.precedence,e),t.instance=i;case"script":return i=fl(a.src),(n=e.querySelector(rn(i)))?(t.instance=n,pe(n),n):(l=a,(n=Fe.get(i))&&(l=P({},a),bu(l,n)),e=e.ownerDocument||e,n=e.createElement("script"),pe(n),be(n,"link",l),e.head.appendChild(n),t.instance=n);case"void":return null;default:throw Error(y(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(l=t.instance,t.state.loading|=4,Ln(l,a.precedence,e));return t.instance}function Ln(e,t,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=l.length?l[l.length-1]:null,i=n,s=0;s<l.length;s++){var u=l[s];if(u.dataset.precedence===t)i=u;else if(i!==n)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function yu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function bu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Gn=null;function Wo(e,t,a){if(Gn===null){var l=new Map,n=Gn=new Map;n.set(a,l)}else n=Gn,l=n.get(a),l||(l=new Map,n.set(a,l));if(l.has(e))return l;for(l.set(e,null),a=a.getElementsByTagName(e),n=0;n<a.length;n++){var i=a[n];if(!(i[an]||i[ve]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var s=i.getAttribute(t)||"";s=e+s;var u=l.get(s);u?u.push(i):l.set(s,[i])}}return l}function Fo(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function n0(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function em(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function i0(e,t,a,l){if(a.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&!(a.state.loading&4)){if(a.instance===null){var n=al(l.href),i=t.querySelector(on(n));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=gi.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=i,pe(i);return}i=t.ownerDocument||t,l=Pd(l),(n=Fe.get(n))&&yu(l,n),i=i.createElement("link"),pe(i);var s=i;s._p=new Promise(function(u,o){s.onload=u,s.onerror=o}),be(i,"link",l),a.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&!(a.state.loading&3)&&(e.count++,a=gi.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var zc=0;function c0(e,t){return e.stylesheets&&e.count===0&&Xn(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var l=setTimeout(function(){if(e.stylesheets&&Xn(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&zc===0&&(zc=62500*qh());var n=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xn(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>zc?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(n)}}:null}function gi(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xn(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var vi=null;function Xn(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,vi=new Map,t.forEach(s0,e),vi=null,gi.call(e))}function s0(e,t){if(!(t.state.loading&4)){var a=vi.get(e);if(a)var l=a.get(null);else{a=new Map,vi.set(e,a);for(var n=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<n.length;i++){var s=n[i];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(a.set(s.dataset.precedence,s),l=s)}l&&a.set(null,l)}n=t.instance,s=n.getAttribute("data-precedence"),i=a.get(s)||l,i===l&&a.set(null,n),a.set(s,n),this.count++,l=gi.bind(this),n.addEventListener("load",l),n.addEventListener("error",l),i?i.parentNode.insertBefore(n,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(n,e.firstChild)),t.state.loading|=4}}var $l={$$typeof:pt,Provider:null,Consumer:null,_currentValue:ca,_currentValue2:ca,_threadCount:0};function u0(e,t,a,l,n,i,s,u,o){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ki(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ki(0),this.hiddenUpdates=Ki(null),this.identifierPrefix=l,this.onUncaughtError=n,this.onCaughtError=i,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function tm(e,t,a,l,n,i,s,u,o,d,g,v){return e=new u0(e,t,a,s,o,d,g,v,u),t=1,i===!0&&(t|=24),i=Re(3,null,null,t),e.current=i,i.stateNode=e,t=Zs(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:l,isDehydrated:a,cache:t},$s(i),e}function am(e){return e?(e=wa,e):wa}function lm(e,t,a,l,n,i){n=am(n),l.context===null?l.context=n:l.pendingContext=n,l=Lt(t),l.payload={element:a},i=i===void 0?null:i,i!==null&&(l.callback=i),a=Gt(e,l,t),a!==null&&(Me(a,e,t),Ol(a,e,t))}function Io(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function Nu(e,t){Io(e,t),(e=e.alternate)&&Io(e,t)}function nm(e){if(e.tag===13||e.tag===31){var t=ya(e,67108864);t!==null&&Me(t,e,67108864),Nu(e,67108864)}}function Po(e){if(e.tag===13||e.tag===31){var t=ke();t=_s(t);var a=ya(e,t);a!==null&&Me(a,e,t),Nu(e,t)}}var xi=!0;function o0(e,t,a,l){var n=E.T;E.T=null;var i=L.p;try{L.p=2,ju(e,t,a,l)}finally{L.p=i,E.T=n}}function r0(e,t,a,l){var n=E.T;E.T=null;var i=L.p;try{L.p=8,ju(e,t,a,l)}finally{L.p=i,E.T=n}}function ju(e,t,a,l){if(xi){var n=bs(l);if(n===null)jc(e,t,l,yi,a),er(e,l);else if(d0(n,e,t,a,l))l.stopPropagation();else if(er(e,l),t&4&&-1<f0.indexOf(e)){for(;n!==null;){var i=cl(n);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var s=la(i.pendingLanes);if(s!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;s;){var o=1<<31-Be(s);u.entanglements[1]|=o,s&=~o}ct(i),!(q&6)&&(ui=He()+500,un(0))}}break;case 31:case 13:u=ya(i,2),u!==null&&Me(u,i,2),wi(),Nu(i,2)}if(i=bs(l),i===null&&jc(e,t,l,yi,a),i===n)break;n=i}n!==null&&l.stopPropagation()}else jc(e,t,l,null,a)}}function bs(e){return e=ws(e),Su(e)}var yi=null;function Su(e){if(yi=null,e=Ca(e),e!==null){var t=Il(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=Sr(t),e!==null)return e;e=null}else if(a===31){if(e=zr(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return yi=e,null}function im(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Wm()){case Mr:return 2;case Or:return 8;case Jn:case Fm:return 32;case Cr:return 268435456;default:return 32}default:return 32}}var Ns=!1,Vt=null,Zt=null,Kt=null,Wl=new Map,Fl=new Map,Rt=[],f0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function er(e,t){switch(e){case"focusin":case"focusout":Vt=null;break;case"dragenter":case"dragleave":Zt=null;break;case"mouseover":case"mouseout":Kt=null;break;case"pointerover":case"pointerout":Wl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fl.delete(t.pointerId)}}function xl(e,t,a,l,n,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:a,eventSystemFlags:l,nativeEvent:i,targetContainers:[n]},t!==null&&(t=cl(t),t!==null&&nm(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,n!==null&&t.indexOf(n)===-1&&t.push(n),e)}function d0(e,t,a,l,n){switch(t){case"focusin":return Vt=xl(Vt,e,t,a,l,n),!0;case"dragenter":return Zt=xl(Zt,e,t,a,l,n),!0;case"mouseover":return Kt=xl(Kt,e,t,a,l,n),!0;case"pointerover":var i=n.pointerId;return Wl.set(i,xl(Wl.get(i)||null,e,t,a,l,n)),!0;case"gotpointercapture":return i=n.pointerId,Fl.set(i,xl(Fl.get(i)||null,e,t,a,l,n)),!0}return!1}function cm(e){var t=Ca(e.target);if(t!==null){var a=Il(t);if(a!==null){if(t=a.tag,t===13){if(t=Sr(a),t!==null){e.blockedOn=t,Bu(e.priority,function(){Po(a)});return}}else if(t===31){if(t=zr(a),t!==null){e.blockedOn=t,Bu(e.priority,function(){Po(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Qn(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=bs(e.nativeEvent);if(a===null){a=e.nativeEvent;var l=new a.constructor(a.type,a);Yc=l,a.target.dispatchEvent(l),Yc=null}else return t=cl(a),t!==null&&nm(t),e.blockedOn=a,!1;t.shift()}return!0}function tr(e,t,a){Qn(e)&&a.delete(t)}function m0(){Ns=!1,Vt!==null&&Qn(Vt)&&(Vt=null),Zt!==null&&Qn(Zt)&&(Zt=null),Kt!==null&&Qn(Kt)&&(Kt=null),Wl.forEach(tr),Fl.forEach(tr)}function Tn(e,t){e.blockedOn===t&&(e.blockedOn=null,Ns||(Ns=!0,fe.unstable_scheduleCallback(fe.unstable_NormalPriority,m0)))}var Mn=null;function ar(e){Mn!==e&&(Mn=e,fe.unstable_scheduleCallback(fe.unstable_NormalPriority,function(){Mn===e&&(Mn=null);for(var t=0;t<e.length;t+=3){var a=e[t],l=e[t+1],n=e[t+2];if(typeof l!="function"){if(Su(l||a)===null)continue;break}var i=cl(a);i!==null&&(e.splice(t,3),t-=3,ts(i,{pending:!0,data:n,method:a.method,action:l},l,n))}}))}function ll(e){function t(o){return Tn(o,e)}Vt!==null&&Tn(Vt,e),Zt!==null&&Tn(Zt,e),Kt!==null&&Tn(Kt,e),Wl.forEach(t),Fl.forEach(t);for(var a=0;a<Rt.length;a++){var l=Rt[a];l.blockedOn===e&&(l.blockedOn=null)}for(;0<Rt.length&&(a=Rt[0],a.blockedOn===null);)cm(a),a.blockedOn===null&&Rt.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var n=a[l],i=a[l+1],s=n[Oe]||null;if(typeof i=="function")s||ar(a);else if(s){var u=null;if(i&&i.hasAttribute("formAction")){if(n=i,s=i[Oe]||null)u=s.formAction;else if(Su(n)!==null)continue}else u=s.action;typeof u=="function"?a[l+1]=u:(a.splice(l,3),l-=3),ar(a)}}}function sm(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(s){return n=s})},focusReset:"manual",scroll:"manual"})}function t(){n!==null&&(n(),n=null),l||setTimeout(a,20)}function a(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,n=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),n!==null&&(n(),n=null)}}}function zu(e){this._internalRoot=e}Yi.prototype.render=zu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(y(409));var a=t.current,l=ke();lm(a,l,e,t,null,null)};Yi.prototype.unmount=zu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;lm(e.current,2,null,e,null,null),wi(),t[il]=null}};function Yi(e){this._internalRoot=e}Yi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Hr();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Rt.length&&t!==0&&t<Rt[a].priority;a++);Rt.splice(a,0,e),a===0&&cm(e)}};var lr=Nr.version;if(lr!=="19.2.8")throw Error(y(527,lr,"19.2.8"));L.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(y(188)):(e=Object.keys(e).join(","),Error(y(268,e)));return e=Xm(t),e=e!==null?Er(e):null,e=e===null?null:e.stateNode,e};var p0={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:E,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var On=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!On.isDisabled&&On.supportsFiber)try{Pl=On.inject(p0),we=On}catch{}}ji.createRoot=function(e,t){if(!jr(e))throw Error(y(299));var a=!1,l="",n=If,i=Pf,s=ed;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onUncaughtError!==void 0&&(n=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=tm(e,1,!1,null,null,a,l,null,n,i,s,sm),e[il]=t.current,xu(e),new zu(t)};ji.hydrateRoot=function(e,t,a){if(!jr(e))throw Error(y(299));var l=!1,n="",i=If,s=Pf,u=ed,o=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onUncaughtError!==void 0&&(i=a.onUncaughtError),a.onCaughtError!==void 0&&(s=a.onCaughtError),a.onRecoverableError!==void 0&&(u=a.onRecoverableError),a.formState!==void 0&&(o=a.formState)),t=tm(e,1,!0,t,a??null,l,n,o,i,s,u,sm),t.context=am(null),a=t.current,l=ke(),l=_s(l),n=Lt(l),n.callback=null,Gt(a,n,l),a=l,t.current.lanes=a,tn(t,a),ct(t),e[il]=t.current,xu(e),new Yi(t)};ji.version="19.2.8";function um(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(um)}catch(e){console.error(e)}}um(),hr.exports=ji;var h0=hr.exports;/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const om=(...e)=>e.filter((t,a,l)=>!!t&&t.trim()!==""&&l.indexOf(t)===a).join(" ").trim();/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g0=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v0=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,l)=>l?l.toUpperCase():a.toLowerCase());/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nr=e=>{const t=v0(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ec={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x0=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},y0=J.createContext({}),b0=()=>J.useContext(y0),N0=J.forwardRef(({color:e,size:t,strokeWidth:a,absoluteStrokeWidth:l,className:n="",children:i,iconNode:s,...u},o)=>{const{size:d=24,strokeWidth:g=2,absoluteStrokeWidth:v=!1,color:f="currentColor",className:h=""}=b0()??{},b=l??v?Number(a??g)*24/Number(t??d):a??g;return J.createElement("svg",{ref:o,...Ec,width:t??d??Ec.width,height:t??d??Ec.height,stroke:e??f,strokeWidth:b,className:om("lucide",h,n),...!i&&!x0(u)&&{"aria-hidden":"true"},...u},[...s.map(([S,H])=>J.createElement(S,H)),...Array.isArray(i)?i:[i]])});/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=(e,t)=>{const a=J.forwardRef(({className:l,...n},i)=>J.createElement(N0,{ref:i,iconNode:t,className:om(`lucide-${g0(nr(e))}`,`lucide-${e}`,l),...n}));return a.displayName=nr(e),a};/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j0=[["path",{d:"m7 7 10 10",key:"1fmybs"}],["path",{d:"M17 7v10H7",key:"6fjiku"}]],S0=Y("arrow-down-right",j0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z0=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],E0=Y("arrow-right",z0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A0=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],Eu=Y("arrow-up-right",A0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T0=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],rm=Y("award",T0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M0=[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]],O0=Y("book-open",M0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C0=[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]],D0=Y("building-2",C0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _0=[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}]],R0=Y("calendar",_0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U0=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],H0=Y("check",U0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w0=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],B0=Y("chevron-left",w0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k0=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Y0=Y("chevron-right",k0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q0=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],L0=Y("circle-alert",q0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G0=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],fm=Y("circle-check",G0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X0=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],Q0=Y("clock",X0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V0=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}]],Au=Y("compass",V0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z0=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],K0=Y("cpu",Z0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J0=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]],$0=Y("crosshair",J0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W0=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],js=Y("download",W0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F0=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],I0=Y("eye",F0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P0=[["path",{d:"M14.086 18.412A2 2 0 0112.67 19H5v-7.672a2 2 0 01.586-1.414L11.75 3.75a6 6 0 118.49 8.49z",key:"1nq9jb"}],["path",{d:"M16 8 2 22",key:"vp34q"}],["path",{d:"M17.488 15H9",key:"16yirz"}]],eg=Y("feather",P0);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tg=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],ag=Y("file-text",tg);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lg=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],ng=Y("funnel",lg);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ig=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],dm=Y("globe",ig);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cg=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],sg=Y("graduation-cap",cg);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ug=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],og=Y("layers",ug);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rg=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],fg=Y("layout-grid",rg);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dg=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],mm=Y("mail",dg);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mg=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],Na=Y("map-pin",mg);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pg=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],hg=Y("phone",pg);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gg=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],vg=Y("printer",gg);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xg=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],yg=Y("send",xg);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bg=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],Tu=Y("sparkles",bg);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ng=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",key:"1ngwbx"}]],jg=Y("wrench",Ng);/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sg=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],bi=Y("x",Sg),V={name:"Adrian Vale",profession:"Architect & Spatial Designer",specialization:"Sustainable Architecture, Urban Spaces & Human-Centered Design",experienceYears:"11+ Years",location:"Copenhagen, Denmark",tagline:"Designing spaces where people, nature, and cities can coexist.",heroStatement:"An independent architect focused on sustainable environments, public spaces, and architecture shaped by human experience.",coordinates:"55.6761° N, 12.5683° E",gridRef:"GRID / A-04",profileYear:"PROFILE / 2026",locationTag:"COPENHAGEN / DK",email:"hello@adrianvale.example",phone:"+45 31 92 84 00",studioAddress:"Strandgade 44, 1401 København K, Denmark",disclaimer:"Fictional Resume/CV template created for demonstration purposes. All names, organizations, projects, images, and content are fictional."},za={sectionNum:"01",title:"The Practice",quote:"Architecture should belong to its surroundings before it belongs to itself.",essay:"In an era of accelerating climate transformation and urban density, my practice champions a return to material honesty, micro-climatic intelligence, and civic intimacy. I approach architecture not as an isolated sculptural object, but as a living spatial canvas—one that listens to prevailing coastal winds, captures low Nordic sunlight, and encourages unscripted human connection. Every project begins with rigorous environmental research before a single line is drawn.",materialImage:"images/philosophy.jpg",principles:[{number:"01",title:"PLACE",subtitle:"Contextual Environmental Integration",description:"Understanding the environment before designing within it. Conducting solar analysis, wind vector modeling, and regional material mapping."},{number:"02",title:"PEOPLE",subtitle:"Human-Centered Spatial Flow",description:"Creating spaces shaped around human behavior, tactile warmth, and experience. Prioritizing spatial clarity, natural acoustics, and intuitive navigation."},{number:"03",title:"TIME",subtitle:"Adaptive Circular Longevity",description:"Designing architecture that can gracefully adapt, age, and remain meaningful over decades through modular construction and circular materials."}]},Ss=[{id:"proj-01",num:"01",name:"NORDHAVEN COMMONS",category:"Mixed-Use",type:"Mixed-Use Community Space",year:"2025",location:"Nordhaven District, Copenhagen, DK",status:"Under Construction (Completion 2026)",image:"images/nordhaven.jpg",shortDescription:"A fictional community-focused mixed-use environment designed around shared courtyards, natural daylighting, and adaptable public gathering spaces.",fullOverview:"Nordhaven Commons reinvents the traditional Scandinavian harbor block into an open civic ecosystem. Composed of mass-timber volumes surrounding a microclimate-protected public garden, the project integrates public workshops, organic market stalls, co-working studios, and 48 low-carbon residences.",designConcept:"Passive solar thermal chimneying and timber colonnades frame views of the harbor while shielding exterior seating from harsh northern sea breezes.",materials:["Cross-Laminated Timber","Triple Low-E Glazing","Recycled Basalt Paving","Zinc Roofing"],metrics:{area:"14,200 m²",carbonReduction:"58% Embodied CO₂",energyRating:"Net Zero Operational",yearCompleted:"2025-2026"},diagrams:[{label:"AXONOMETRIC SOLAR CHIMNEY",detail:"Natural convective air movement through central atrium"},{label:"TIMBER JOINERY SPECIFICATION",detail:"Glue-free demountable timber-to-steel node joints"}]},{id:"proj-02",num:"02",name:"THE VERDE LIBRARY",category:"Cultural",type:"Public Cultural Space",year:"2024",location:"Østerbro, Copenhagen, DK",status:"Completed",image:"images/verde.jpg",shortDescription:"A fictional public library integrating landscape, cascading daylight, acoustic wood volumes, and community learning spaces.",fullOverview:"Designed as a 'living room for the city,' The Verde Library bridges a public municipal park with a historic neighborhood. Featuring a multi-story indoor botanical atrium, quiet subterranean reading vaults, and flexible media labs, the interior creates a seamless sensory transition between nature and literature.",designConcept:"Light-funneling skylights direct soft north light deep into reading zones, eliminating harsh glare while fostering deep concentration.",materials:["Danish White Ash","Acoustic Recycled Wood Fiber","Structural Double Glass","Living Hydroponic Moss Panels"],metrics:{area:"8,500 m²",carbonReduction:"44% Embodied CO₂",energyRating:"Nordic Swan Certified",yearCompleted:"2024"},diagrams:[{label:"DAYLIGHT LUX MAPPING",detail:"Uniform 450 Lux diffuse light distribution"},{label:"ACOUSTIC INSULATION BUFFER",detail:"Triple-layer sound attenuation wall assemblies"}]},{id:"proj-03",num:"03",name:"TIDEHOUSE",category:"Residential",type:"Coastal Residential Architecture",year:"2023",location:"Skagen Coastline, Denmark",status:"Built",image:"images/tidehouse.jpg",shortDescription:"A fictional coastal residence exploring climate-responsive monolithic concrete, dark zinc, and open spatial ocean views.",fullOverview:"Perched along the exposed granite rocks of the Skagen coast, Tidehouse is engineered to withstand extreme sea salt exposure and heavy storms while providing an ultra-serene sanctuary. Cantilevered living quarters hover above the tidal zone, framing uninterrupted views of the Kattegat horizon.",designConcept:"A dual-wing geometry buffers cold North Sea winds on the seaward facade while carving out a sunlit, sheltered south-facing inner patio.",materials:["Board-Formed Concrete","Pre-Weathered Dark Zinc","Thermally Modified Ash Decking","Triple-Pane Marine Glass"],metrics:{area:"420 m²",carbonReduction:"35% Embodied CO₂",energyRating:"Passive House Standard",yearCompleted:"2023"},diagrams:[{label:"FOUNDATION TIDE ANCHORING",detail:"Direct granite bedrock anchor pin system"},{label:"THERMAL ENVELOPE SECTIONS",detail:"300mm continuous insulation cavity"}]},{id:"proj-04",num:"04",name:"AXIS COURTYARD",category:"Urban Renewal",type:"Urban Regeneration",year:"2022",location:"Nørrebro, Copenhagen, DK",status:"Completed",image:"images/axis.jpg",shortDescription:"A fictional urban renewal concept focused on transforming underused industrial warehouse yards into vibrant community public plazas.",fullOverview:"Axis Courtyard adaptive-reuse masterplan revitalizes a former 19th-century textile factory site. By retaining historic red-brick facades and inserting elevated steel bridges, rainwater retention ponds, and terraced seating, the site was transformed into a thriving pedestrian district.",designConcept:"Combining historic industrial texture with refined modern transparency to foster creative industries and community gathering.",materials:["Reclaimed 1890s Red Brick","Weathered Corten Steel","Granite Cobblestone","Laminated Birch Panels"],metrics:{area:"19,800 m² Masterplan",carbonReduction:"72% Saved vs Demolition",energyRating:"BREEAM Outstanding",yearCompleted:"2022"},diagrams:[{label:"RAINWATER DRAINAGE RUNOFF",detail:"100% onsite storm water bio-swale retention"},{label:"FACADE STABILIZATION TRUSS",detail:"Historic brick wall bracing methodology"}]},{id:"proj-05",num:"05",name:"FIELD STUDIO",category:"Workplace",type:"Creative Workspace",year:"2021",location:"Zealand Meadow, Denmark",status:"Completed",image:"images/field.jpg",shortDescription:"A fictional low-impact workspace designed for flexible creative collaboration amidst wild Danish meadow landscapes.",fullOverview:"Constructed on a rural agrarian estate, Field Studio serves as an off-grid research lodge and architectural workshop. Utilizing locally sourced rammed earth from excavation and untreated larch timber, the structure leaves a minimal physical footprint.",designConcept:"Harmonizing building elevation with the natural meadow horizon line, allowing native wildflowers and seasonal grasses to sweep directly against glass facades.",materials:["Locally Rammed Earth","Untreated Larch Siding","Photovoltaic Roof Glass","Polished Lime Plaster"],metrics:{area:"350 m²",carbonReduction:"82% Carbon Negative Structure",energyRating:"Off-Grid Solar + Geothermal",yearCompleted:"2021"},diagrams:[{label:"RAMMED EARTH STRATIGRAPHY",detail:"Soil-binder mix ratio & thermal mass performance"},{label:"MEADOW ECOSYSTEM BUFFER",detail:"Zero-runoff peripheral drainage channel"}]}],pm=[{period:"2022 — PRESENT",role:"Lead Architect",company:"Atelier Northline",location:"Copenhagen, Denmark",type:"Fictional Architecture Practice",coordinates:"CPH / 55.68° N",description:"Heading architectural concept development and sustainable urban initiatives across Scandinavia.",responsibilities:["Leading multidisciplinary design teams on mass-timber mixed-use developments","Directing client keynote presentations, municipal zoning negotiations, and environmental approvals","Integrating parametric daylight modeling and LCA carbon accounting into early schematic phases","Mentoring 12 studio architects and establishing sustainable material specification standards"]},{period:"2018 — 2022",role:"Senior Architect",company:"Formline Collective",location:"Stockholm, Sweden",type:"Fictional Architecture Studio",coordinates:"STO / 59.32° N",description:"Managed public cultural infrastructure projects and residential masterplans.",responsibilities:["Principal design lead for public library and community space competitions","Supervised BIM coordination models (Revit/Rhino) from schematic design through site execution","Engineered high-performance building envelopes for extreme Scandinavian winter climates","Collaborated directly with structural engineers, landscape architects, and municipal planning boards"]},{period:"2015 — 2018",role:"Architectural Designer",company:"Urban Frame Studio",location:"Copenhagen, Denmark",type:"Fictional Architecture Organization",coordinates:"CPH / 55.67° N",description:"Focused on adaptive-reuse urban renewal projects and detailed facade drafting.",responsibilities:["Developed detailed CD packages, facade joinery sections, and structural detailing","Authored material sustainability audit reports for heritage building restorations","Created high-end architectural renders, physical timber models, and client presentation boards","Conducted weekly site inspections and contractor coordination meetings"]},{period:"2013 — 2015",role:"Junior Architectural Designer",company:"Contour Works",location:"Aarhus, Denmark",type:"Fictional Organization",coordinates:"AAR / 56.16° N",description:"Assisted senior partners with competition entries, physical modeling, and site analysis.",responsibilities:["Fabricated precision basswood and acrylic architectural competition models","Executed 3D CAD modeling, shadow analysis, and site topography mapping","Assisted with environmental impact documentation and client workshop prep"]}],hm=[{category:"ARCHITECTURAL DESIGN",code:"SEC / 01",skills:[{name:"Concept Development",level:"Expert",spec:"Schematic & Spatial Ideation"},{name:"Spatial Planning",level:"Expert",spec:"Volumetric Efficiency & Circulation"},{name:"Sustainable Design",level:"Expert",spec:"Passive Solar & Mass Timber"},{name:"Urban Analysis",level:"Advanced",spec:"Pedestrian Flow & Microclimate"}]},{category:"DIGITAL TOOLS",code:"SEC / 02",skills:[{name:"BIM Modeling",level:"Expert",spec:"Autodesk Revit & ArchiCAD"},{name:"3D Visualization",level:"Expert",spec:"Rhino 3D, V-Ray & Enscape"},{name:"CAD Documentation",level:"Expert",spec:"AutoCAD & Technical Sections"},{name:"Parametric Design",level:"Advanced",spec:"Grasshopper & Generative Scripts"}]},{category:"PROJECT DEVELOPMENT",code:"SEC / 03",skills:[{name:"Design Coordination",level:"Expert",spec:"MEP & Structural Integration"},{name:"Material Research",level:"Expert",spec:"Circular & Low-Carbon Spec"},{name:"Site Analysis",level:"Advanced",spec:"Topography & Solar Mapping"},{name:"Presentation Design",level:"Expert",spec:"Editorial Portfolio & Keynote"}]},{category:"PROFESSIONAL SKILLS",code:"SEC / 04",skills:[{name:"Team Leadership",level:"Expert",spec:"Studio Direction & Mentorship"},{name:"Client Communication",level:"Expert",spec:"Keynote & Stakeholder Mgmt"},{name:"Design Strategy",level:"Expert",spec:"Competition & Feasibility Lead"},{name:"Creative Direction",level:"Expert",spec:"Brand & Spatial Storytelling"}]}],gm=[{degree:"Master of Architecture (M.Arch)",institution:"Nordic Institute of Spatial Design",year:"2011 — 2013",type:"Fictional Academic Institution",location:"Copenhagen, Denmark",focus:"Sustainable Architecture & Urban Systems",thesis:"Thesis: 'Passive Solar Integration in High-Latitude Community Housing'",honors:"Graduated with First Class Distinction & Excellence Award"},{degree:"Bachelor of Architectural Studies (B.AS)",institution:"Scandinavian School of Built Environments",year:"2008 — 2011",type:"Fictional Academic Institution",location:"Aarhus, Denmark",focus:"Vernacular Construction & Material Science",thesis:"Valedictorian Project: 'Demountable Timber Joinery Systems for Reusable Structures'",honors:"Dean's Honor List (All Semesters)"}],ir={projects:[{code:"RES / 2025",title:"LIVING CITIES",year:"2025",subtitle:"Research into adaptable public environments and post-industrial urban re-wilding.",summary:"An investigation into how modular wooden structural infills can revitalize decommissioned shipping piers across Northern Europe."},{code:"RES / 2023",title:"MATERIAL FUTURES",year:"2023",subtitle:"A fictional exploration of sustainable construction materials & bio-composites.",summary:"Comparative carbon-footprint lifecycle assessment measuring rammed earth, hempcrete, and cross-laminated timber against standard concrete."},{code:"RES / 2021",title:"WATER & CITY",year:"2021",subtitle:"A fictional study about urban environments near changing coastline ecosystems.",summary:"Spatial strategies for amphibious coastal housing modules resilient to a 1.5m sea-level rise along Nordic coastlines."}],exhibitions:[{title:"Spatial Futures",location:"Copenhagen",year:"2025",role:"Lead Visual Contributor & Guest Lecturer"},{title:"Common Ground",location:"Rotterdam",year:"2023",role:"Group Exhibition on Social Housing Architecture"},{title:"Material Conversations",location:"Helsinki",year:"2021",role:"Pavilion Installation: Reclaimed Wood & Glass"}]},vm=[{year:"2025",title:"Emerging Practice Recognition",organization:"Northern Spatial Forum",location:"Stockholm, Sweden",projectRef:"Nordhaven Commons"},{year:"2024",title:"Sustainable Design Award",organization:"European Built Environment Assembly",location:"Berlin, Germany",projectRef:"The Verde Library"},{year:"2022",title:"Public Space Innovation Recognition",organization:"Urban Futures Collective",location:"Copenhagen, Denmark",projectRef:"Axis Courtyard"},{year:"2020",title:"Nordic Young Architect Fellowship",organization:"Scandinavian Architectural Trust",location:"Oslo, Norway",projectRef:"Research Portfolio"}];function zg({onOpenCV:e}){const[t,a]=J.useState(!1),[l,n]=J.useState(!1),[i,s]=J.useState("profile");J.useEffect(()=>{const d=()=>{window.scrollY>40?a(!0):a(!1);const g=["profile","practice","projects","experience","expertise","education","research","contact"],v=window.scrollY+200;for(const f of g){const h=document.getElementById(f);if(h){const b=h.offsetTop,S=h.offsetHeight;if(v>=b&&v<b+S){s(f);break}}}};return window.addEventListener("scroll",d),()=>window.removeEventListener("scroll",d)},[]);const u=[{id:"profile",label:"Profile"},{id:"practice",label:"Practice"},{id:"projects",label:"Projects"},{id:"experience",label:"Experience"},{id:"expertise",label:"Expertise"},{id:"education",label:"Education"},{id:"contact",label:"Contact"}],o=d=>{n(!1);const g=document.getElementById(d);if(g){const f=document.body.getBoundingClientRect().top,S=g.getBoundingClientRect().top-f-80;window.scrollTo({top:S,behavior:"smooth"})}};return c.jsxs(c.Fragment,{children:[c.jsx("header",{className:`sticky-nav ${t?"scrolled":""}`,children:c.jsxs("div",{className:"container nav-container",children:[c.jsxs("div",{className:"nav-brand",onClick:()=>o("profile"),children:[c.jsx("div",{className:"monogram-box",children:"AV"}),c.jsxs("div",{className:"brand-text",children:[c.jsx("span",{className:"brand-name",children:V.name}),c.jsx("span",{className:"brand-title",children:"ARCHITECT / SPATIAL DESIGNER"})]})]}),c.jsx("nav",{className:"desktop-nav",children:u.map(d=>c.jsx("button",{onClick:()=>o(d.id),className:`nav-link ${i===d.id?"active":""}`,children:d.label},d.id))}),c.jsxs("div",{className:"nav-actions",children:[c.jsxs("button",{className:"btn-outline cv-btn",onClick:e,children:[c.jsx(js,{size:14}),c.jsx("span",{children:"Download CV"})]}),c.jsx("button",{className:"mobile-toggle",onClick:()=>n(!l),"aria-label":"Toggle Navigation Menu",children:l?c.jsx(bi,{size:24}):c.jsx(Au,{size:22})})]})]})}),l&&c.jsxs("div",{className:"mobile-overlay",children:[c.jsx("div",{className:"mobile-overlay-grid"}),c.jsxs("div",{className:"mobile-overlay-header",children:[c.jsx("div",{className:"monogram-box",children:"AV"}),c.jsx("span",{className:"mono-text",children:"COPENHAGEN / DK — 2026"}),c.jsx("button",{className:"mobile-close",onClick:()=>n(!1),children:c.jsx(bi,{size:28})})]}),c.jsxs("div",{className:"mobile-nav-content",children:[c.jsx("span",{className:"section-label",children:"NAVIGATION MATRIX"}),c.jsx("nav",{className:"mobile-links",children:u.map((d,g)=>c.jsxs("button",{onClick:()=>o(d.id),className:`mobile-link ${i===d.id?"active":""}`,children:[c.jsxs("span",{className:"link-num",children:["0",g+1]}),c.jsx("span",{className:"link-text",children:d.label}),c.jsx(Eu,{size:20,className:"link-arrow"})]},d.id))}),c.jsxs("div",{className:"mobile-overlay-footer",children:[c.jsxs("button",{className:"btn-primary full-width",onClick:()=>{n(!1),e()},children:[c.jsx(js,{size:16}),c.jsx("span",{children:"DOWNLOAD COMPLETE CV"})]}),c.jsx("p",{className:"mono-text legal-note",children:V.disclaimer})]})]})]}),c.jsx("style",{children:`
        .sticky-nav {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-light);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .sticky-nav.scrolled {
          background-color: rgba(255, 255, 255, 0.98);
          border-bottom-color: var(--border-medium);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
        }

        .monogram-box {
          width: 42px;
          height: 42px;
          background-color: var(--accent-charcoal);
          color: var(--bg-pure);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.05em;
          transition: transform 0.3s ease;
        }

        .nav-brand:hover .monogram-box {
          background-color: var(--accent-green);
          transform: rotate(90deg);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-main);
          line-height: 1.1;
        }

        .brand-title {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-link {
          background: none;
          border: none;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          cursor: pointer;
          padding: 8px 0;
          position: relative;
          transition: color 0.25s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--accent-green);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: var(--text-main);
        }

        .nav-link.active {
          color: var(--accent-green);
          font-weight: 700;
        }

        .nav-link.active::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cv-btn {
          padding: 10px 20px;
          font-size: 0.75rem;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: 1px solid var(--border-light);
          padding: 10px;
          color: var(--text-main);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-toggle:hover {
          background-color: var(--bg-gray);
        }

        /* Mobile Overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--bg-pure);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          padding: 24px;
          animation: slideDown 0.3s ease forwards;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-overlay-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-light);
        }

        .mobile-close {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-main);
        }

        .mobile-nav-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 0 20px;
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 24px;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 20px;
          background: none;
          border: none;
          border-bottom: 1px solid var(--border-light);
          padding: 16px 0;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .link-num {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--accent-green);
        }

        .link-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-main);
          flex: 1;
        }

        .mobile-link.active .link-text {
          color: var(--accent-green);
        }

        .mobile-overlay-footer {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: auto;
        }

        .full-width {
          width: 100%;
        }

        .legal-note {
          font-size: 0.65rem;
          text-align: center;
          opacity: 0.6;
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: flex;
          }
        }

        @media (max-width: 600px) {
          .cv-btn {
            display: none;
          }
          .brand-title {
            display: none;
          }
          .monogram-box {
            width: 36px;
            height: 36px;
            font-size: 0.95rem;
          }
          .brand-name {
            font-size: 0.95rem;
          }
          .mobile-link {
            padding: 12px 0;
          }
          .link-text {
            font-size: 1.25rem;
          }
        }
      `})]})}function Eg({onOpenCV:e,onExploreProjects:t}){return c.jsxs("section",{id:"profile",className:"arch-section hero-section",children:[c.jsx("div",{className:"arch-grid-lines"}),c.jsxs("div",{className:"container hero-container",children:[c.jsxs("div",{className:"hero-left",children:[c.jsx("div",{className:"hero-badge",children:c.jsx("span",{className:"section-label",children:"ARCHITECT / SPATIAL DESIGNER"})}),c.jsxs("h1",{className:"hero-title display-title",children:[c.jsx("span",{className:"name-first",children:"ADRIAN"}),c.jsx("span",{className:"name-last",children:"VALE"})]}),c.jsx("div",{className:"hero-subtitle-box",children:c.jsx("p",{className:"hero-subtitle",children:V.tagline})}),c.jsxs("p",{className:"hero-statement",children:['"',V.heroStatement,'"']}),c.jsxs("div",{className:"hero-actions",children:[c.jsxs("button",{className:"btn-primary",onClick:t,children:[c.jsx("span",{children:"View Selected Projects"}),c.jsx(S0,{size:18})]}),c.jsxs("button",{className:"btn-outline",onClick:e,children:[c.jsx(js,{size:16}),c.jsx("span",{children:"Download CV"})]})]}),c.jsxs("div",{className:"hero-metadata-grid",children:[c.jsxs("div",{className:"meta-card",children:[c.jsxs("div",{className:"meta-header",children:[c.jsx(Na,{size:14,className:"meta-icon"}),c.jsx("span",{className:"mono-text",children:"LOCATION"})]}),c.jsx("span",{className:"meta-value",children:V.location})]}),c.jsxs("div",{className:"meta-card",children:[c.jsxs("div",{className:"meta-header",children:[c.jsx(rm,{size:14,className:"meta-icon"}),c.jsx("span",{className:"mono-text",children:"EXPERIENCE"})]}),c.jsx("span",{className:"meta-value",children:V.experienceYears})]}),c.jsxs("div",{className:"meta-card full-width-meta",children:[c.jsxs("div",{className:"meta-header",children:[c.jsx(og,{size:14,className:"meta-icon"}),c.jsx("span",{className:"mono-text",children:"PRIMARY FOCUS"})]}),c.jsx("span",{className:"meta-value",children:V.specialization})]})]})]}),c.jsx("div",{className:"hero-right",children:c.jsxs("div",{className:"portrait-wrapper",children:[c.jsx("div",{className:"arch-corner-tick tick-tl"}),c.jsx("div",{className:"arch-corner-tick tick-tr"}),c.jsx("div",{className:"arch-corner-tick tick-bl"}),c.jsx("div",{className:"arch-corner-tick tick-br"}),c.jsxs("div",{className:"portrait-tag tag-top-left",children:[c.jsx($0,{size:12}),c.jsx("span",{children:V.gridRef})]}),c.jsx("div",{className:"portrait-tag tag-top-right",children:c.jsx("span",{children:V.profileYear})}),c.jsx("div",{className:"portrait-tag tag-bottom-left",children:c.jsx("span",{children:V.coordinates})}),c.jsx("div",{className:"portrait-tag tag-bottom-right",children:c.jsx("span",{children:V.locationTag})}),c.jsxs("div",{className:"portrait-image-container",children:[c.jsx("img",{src:"images/portrait.jpg",alt:"Adrian Vale — Fictional Architect Portrait",className:"portrait-img"}),c.jsx("div",{className:"portrait-grid-overlay"})]}),c.jsx("div",{className:"portrait-caption",children:c.jsx("span",{className:"mono-text",children:"FIG 0.1 — ARCHITECTURAL STUDIO / COPENHAGEN"})})]})})]}),c.jsx("style",{children:`
        .hero-section {
          padding-top: 60px;
          padding-bottom: 120px;
          background: linear-gradient(180deg, var(--bg-pure) 0%, var(--bg-warm) 100%);
          overflow: hidden;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
        }

        .hero-badge {
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: clamp(3.8rem, 7vw, 6.5rem);
          line-height: 0.92;
          margin-bottom: 28px;
          display: flex;
          flex-direction: column;
          color: var(--accent-charcoal);
        }

        .name-first {
          font-weight: 800;
        }

        .name-last {
          font-weight: 400;
          color: var(--accent-green);
          letter-spacing: -0.04em;
        }

        .hero-subtitle-box {
          border-left: 3px solid var(--accent-green);
          padding-left: 20px;
          margin-bottom: 24px;
        }

        .hero-subtitle {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--text-main);
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        .hero-statement {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 580px;
          line-height: 1.7;
          margin-bottom: 40px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .hero-metadata-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding-top: 32px;
          border-top: 1px solid var(--border-light);
        }

        .meta-card {
          background-color: var(--bg-pure);
          border: 1px solid var(--border-light);
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .full-width-meta {
          grid-column: 1 / -1;
        }

        .meta-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--accent-green);
        }

        .meta-icon {
          color: var(--accent-green);
        }

        .meta-value {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-main);
        }

        /* HERO RIGHT: PORTRAIT */
        .hero-right {
          position: relative;
        }

        .portrait-wrapper {
          position: relative;
          padding: 24px;
          background-color: var(--bg-pure);
          border: 1px solid var(--border-light);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
        }

        .portrait-image-container {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          border: 1px solid var(--border-medium);
        }

        .portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: contrast(1.03) brightness(1.02);
          transition: transform 0.6s ease;
        }

        .portrait-wrapper:hover .portrait-img {
          transform: scale(1.03);
        }

        .portrait-grid-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(0deg, rgba(20, 20, 20, 0.2) 0%, transparent 40%);
        }

        .portrait-tag {
          position: absolute;
          background-color: var(--accent-charcoal);
          color: var(--bg-pure);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          padding: 6px 12px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tag-top-left { top: 8px; left: 8px; }
        .tag-top-right { top: 8px; right: 8px; background-color: var(--bg-pure); color: var(--text-main); border: 1px solid var(--border-medium); }
        .tag-bottom-left { bottom: 44px; left: 8px; background-color: var(--bg-pure); color: var(--text-main); border: 1px solid var(--border-medium); }
        .tag-bottom-right { bottom: 44px; right: 8px; background-color: var(--accent-green); }

        .portrait-caption {
          margin-top: 14px;
          text-align: center;
          padding-top: 10px;
          border-top: 1px dashed var(--border-light);
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-right {
            max-width: 500px;
            margin: 0 auto;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            padding-top: 36px;
            padding-bottom: 60px;
          }
          .hero-title {
            font-size: clamp(2.4rem, 9vw, 3.8rem);
            margin-bottom: 18px;
          }
          .hero-subtitle {
            font-size: 1.15rem;
          }
          .hero-statement {
            font-size: 0.95rem;
            margin-bottom: 28px;
          }
          .hero-metadata-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            padding-top: 24px;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
            gap: 12px;
            margin-bottom: 32px;
          }
          .hero-actions button {
            width: 100%;
          }
          .portrait-wrapper {
            padding: 14px;
          }
          .portrait-tag {
            font-size: 0.58rem;
            padding: 4px 8px;
          }
          .tag-top-left { top: 6px; left: 6px; }
          .tag-top-right { top: 6px; right: 6px; }
          .tag-bottom-left { bottom: 36px; left: 6px; }
          .tag-bottom-right { bottom: 36px; right: 6px; }
        }
      `})]})}function Ag(){const e=t=>t===0?c.jsx(Au,{size:20}):t===1?c.jsx(eg,{size:20}):c.jsx(Q0,{size:20});return c.jsxs("section",{id:"practice",className:"arch-section philosophy-section",children:[c.jsx("div",{className:"arch-grid-lines"}),c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"section-header-bar",children:[c.jsxs("div",{className:"header-left",children:[c.jsx("span",{className:"section-number",children:za.sectionNum}),c.jsxs("div",{className:"header-titles",children:[c.jsx("span",{className:"section-label",children:"PHILOSOPHY & APPROACH"}),c.jsx("h2",{className:"section-title display-title",children:za.title})]})]}),c.jsx("div",{className:"header-line"})]}),c.jsxs("div",{className:"quote-banner",children:[c.jsx("div",{className:"quote-mark",children:"“"}),c.jsx("h3",{className:"hero-quote-text",children:za.quote})]}),c.jsxs("div",{className:"philosophy-grid",children:[c.jsxs("div",{className:"essay-column",children:[c.jsx("h4",{className:"essay-headline",children:"Spatial design as a dialogue between natural ecology and urban culture."}),c.jsx("p",{className:"essay-paragraph",children:za.essay}),c.jsx("p",{className:"essay-paragraph secondary",children:"By prioritizing low-carbon bio-materials, natural ventilation stacks, and circular building components, my practice delivers projects that age gracefully. We reject superficial trends in favor of structural clarity, volumetric warmth, and acoustic serenity."}),c.jsxs("div",{className:"philosophy-tags",children:[c.jsx("span",{className:"tag-item",children:"#SUSTAINABILITY"}),c.jsx("span",{className:"tag-item",children:"#MASS_TIMBER"}),c.jsx("span",{className:"tag-item",children:"#PASSIVE_SOLAR"}),c.jsx("span",{className:"tag-item",children:"#HUMAN_SCALE"})]})]}),c.jsx("div",{className:"visual-column",children:c.jsxs("div",{className:"material-image-frame",children:[c.jsx("div",{className:"arch-corner-tick tick-tl"}),c.jsx("div",{className:"arch-corner-tick tick-tr"}),c.jsx("div",{className:"arch-corner-tick tick-bl"}),c.jsx("div",{className:"arch-corner-tick tick-br"}),c.jsx("img",{src:za.materialImage,alt:"Architectural Material Tactility Study",className:"material-img"}),c.jsxs("div",{className:"material-overlay-tag",children:[c.jsx(Tu,{size:14}),c.jsx("span",{children:"MATERIAL STUDY / OAK, CAST CONCRETE & BRONZE"})]})]})})]}),c.jsxs("div",{className:"principles-container",children:[c.jsxs("div",{className:"principles-label-row",children:[c.jsx("span",{className:"mono-text",children:"CORE PRACTICE PRINCIPLES"}),c.jsx("div",{className:"line-anim"})]}),c.jsx("div",{className:"principles-grid",children:za.principles.map((t,a)=>c.jsxs("div",{className:"principle-card arch-card",children:[c.jsx("div",{className:"arch-corner-tick tick-tl"}),c.jsx("div",{className:"arch-corner-tick tick-tr"}),c.jsx("div",{className:"arch-corner-tick tick-bl"}),c.jsx("div",{className:"arch-corner-tick tick-br"}),c.jsxs("div",{className:"principle-top",children:[c.jsxs("span",{className:"principle-num",children:["0",a+1," — ",t.title]}),c.jsx("div",{className:"principle-icon",children:e(a)})]}),c.jsx("h4",{className:"principle-title",children:t.subtitle}),c.jsx("p",{className:"principle-desc",children:t.description})]},t.number))})]})]}),c.jsx("style",{children:`
        .philosophy-section {
          background-color: var(--bg-pure);
          border-bottom: 1px solid var(--border-light);
        }

        .section-header-bar {
          display: flex;
          align-items: flex-end;
          gap: 32px;
          margin-bottom: 60px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .header-titles {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .section-title {
          font-size: 2.4rem;
          color: var(--accent-charcoal);
        }

        .header-line {
          flex: 1;
          height: 1px;
          background-color: var(--border-medium);
          margin-bottom: 12px;
        }

        /* QUOTE BANNER */
        .quote-banner {
          background-color: var(--bg-warm);
          border: 1px solid var(--border-light);
          border-left: 4px solid var(--accent-green);
          padding: 48px 56px;
          margin-bottom: 70px;
          position: relative;
        }

        .quote-mark {
          position: absolute;
          top: 10px;
          left: 20px;
          font-family: var(--font-display);
          font-size: 5rem;
          color: var(--border-medium);
          opacity: 0.4;
          line-height: 1;
          pointer-events: none;
        }

        .hero-quote-text {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: var(--accent-charcoal);
          line-height: 1.25;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
        }

        /* PHILOSOPHY GRID */
        .philosophy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 80px;
        }

        .essay-headline {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-charcoal);
          margin-bottom: 20px;
          line-height: 1.35;
        }

        .essay-paragraph {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.75;
          margin-bottom: 20px;
        }

        .essay-paragraph.secondary {
          font-size: 0.98rem;
          color: var(--text-light);
        }

        .philosophy-tags {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .tag-item {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          padding: 6px 12px;
          background-color: var(--bg-gray);
          color: var(--accent-green);
          border: 1px solid var(--border-light);
        }

        /* MATERIAL VISUAL FRAME */
        .material-image-frame {
          position: relative;
          padding: 16px;
          background-color: var(--bg-warm);
          border: 1px solid var(--border-light);
        }

        .material-img {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          display: block;
          border: 1px solid var(--border-medium);
          filter: contrast(1.02);
        }

        .material-overlay-tag {
          position: absolute;
          bottom: 28px;
          left: 28px;
          right: 28px;
          background-color: rgba(20, 20, 20, 0.9);
          color: var(--bg-pure);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(4px);
        }

        /* THREE PRINCIPLES GRID */
        .principles-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .principles-label-row {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .principles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .principle-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .principle-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .principle-num {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--accent-green);
        }

        .principle-icon {
          color: var(--accent-charcoal);
          padding: 8px;
          background-color: var(--bg-gray);
        }

        .principle-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 12px;
        }

        .principle-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .philosophy-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .principles-grid {
            grid-template-columns: 1fr;
          }
          .quote-banner {
            padding: 32px;
          }
        }

        @media (max-width: 640px) {
          .quote-banner {
            padding: 24px 18px;
            margin-bottom: 36px;
          }
          .quote-mark {
            font-size: 3rem;
            top: 4px;
            left: 8px;
          }
          .hero-quote-text {
            font-size: clamp(1.2rem, 4.5vw, 1.6rem);
          }
          .essay-headline {
            font-size: 1.25rem;
          }
          .essay-paragraph {
            font-size: 0.95rem;
          }
          .material-image-frame {
            padding: 10px;
          }
          .material-overlay-tag {
            bottom: 16px;
            left: 16px;
            right: 16px;
            font-size: 0.6rem;
            padding: 8px 10px;
          }
        }
      `})]})}function Tg({onSelectProject:e}){const[t,a]=J.useState("All"),[l,n]=J.useState(null),[i,s]=J.useState({x:0,y:0}),[u,o]=J.useState(!1),d=["All","Mixed-Use","Cultural","Residential","Urban Renewal","Workplace"],g=t==="All"?Ss:Ss.filter(f=>f.category===t),v=f=>{s({x:f.clientX,y:f.clientY})};return c.jsxs("section",{id:"projects",className:"arch-section projects-section",onMouseMove:v,children:[c.jsx("div",{className:"arch-grid-lines"}),u&&c.jsxs("div",{className:"custom-cursor-tag",style:{left:`${i.x}px`,top:`${i.y}px`},children:[c.jsx(I0,{size:12}),c.jsxs("span",{children:["EXPLORE ",l==null?void 0:l.num]})]}),c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"section-header-bar",children:[c.jsxs("div",{className:"header-left",children:[c.jsx("span",{className:"section-number",children:"02"}),c.jsxs("div",{className:"header-titles",children:[c.jsx("span",{className:"section-label",children:"SELECTED WORKS"}),c.jsx("h2",{className:"section-title display-title",children:"Featured Projects"})]})]}),c.jsx("div",{className:"header-line"})]}),c.jsxs("div",{className:"filter-bar",children:[c.jsxs("div",{className:"filter-label",children:[c.jsx(ng,{size:14}),c.jsx("span",{className:"mono-text",children:"FILTER BY TYPOLOGY:"})]}),c.jsx("div",{className:"filter-buttons",children:d.map(f=>c.jsx("button",{onClick:()=>a(f),className:`filter-btn ${t===f?"active":""}`,children:f},f))})]}),c.jsx("div",{className:"projects-gallery-list",children:g.map((f,h)=>{const b=h%5===0,S=h%5===1,H=h%5===2,m=h%5===3;return c.jsxs("div",{className:`project-layout-item ${b?"layout-full":S?"layout-split":H?"layout-horizontal":m?"layout-asymmetric":"layout-standard"}`,onClick:()=>e(f),onMouseEnter:()=>{n(f),o(!0)},onMouseLeave:()=>{n(null),o(!1)},children:[c.jsx("div",{className:"arch-corner-tick tick-tl"}),c.jsx("div",{className:"arch-corner-tick tick-tr"}),c.jsx("div",{className:"arch-corner-tick tick-bl"}),c.jsx("div",{className:"arch-corner-tick tick-br"}),c.jsxs("div",{className:"project-image-box",children:[c.jsx("img",{src:f.image,alt:f.name,className:"project-img"}),c.jsxs("div",{className:"image-overlay-bar",children:[c.jsxs("span",{className:"mono-text",children:["SPEC / ",f.year]}),c.jsx("span",{className:"mono-text",children:f.location})]})]}),c.jsxs("div",{className:"project-content-box",children:[c.jsxs("div",{className:"project-top-row",children:[c.jsxs("span",{className:"project-index-num",children:["PROJECT ",f.num]}),c.jsx("span",{className:"project-category-badge",children:f.type})]}),c.jsx("h3",{className:"project-title display-title",children:f.name}),c.jsx("p",{className:"project-description",children:f.shortDescription}),c.jsxs("div",{className:"project-mini-specs",children:[c.jsxs("div",{className:"mini-spec-col",children:[c.jsx("span",{className:"mini-label",children:"PRIMARY MATERIALS"}),c.jsx("span",{className:"mini-val",children:f.materials.slice(0,2).join(", ")})]}),c.jsxs("div",{className:"mini-spec-col",children:[c.jsx("span",{className:"mini-label",children:"STATUS"}),c.jsx("span",{className:"mini-val highlight",children:f.status})]})]}),c.jsxs("div",{className:"project-action-row",children:[c.jsxs("span",{className:"explore-link",children:["Explore Project Blueprint",c.jsx(Eu,{size:16,className:"arrow-icon"})]}),c.jsx("span",{className:"mono-text year-tag",children:f.year})]})]})]},f.id)})})]}),c.jsx("style",{children:`
        .projects-section {
          background-color: var(--bg-warm);
        }

        .filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background-color: var(--bg-pure);
          border: 1px solid var(--border-light);
          margin-bottom: 50px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--accent-green);
        }

        .filter-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: none;
          border: 1px solid var(--border-light);
          padding: 8px 16px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          border-color: var(--border-dark);
          color: var(--text-main);
        }

        .filter-btn.active {
          background-color: var(--accent-charcoal);
          color: var(--bg-pure);
          border-color: var(--accent-charcoal);
        }

        /* PROJECTS GALLERY CONTAINER */
        .projects-gallery-list {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .project-layout-item {
          background-color: var(--bg-pure);
          border: 1px solid var(--border-light);
          padding: 32px;
          position: relative;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: grid;
          gap: 36px;
        }

        .project-layout-item:hover {
          border-color: var(--accent-charcoal);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
        }

        .project-image-box {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border-medium);
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-layout-item:hover .project-img {
          transform: scale(1.04);
        }

        .image-overlay-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px 20px;
          background: linear-gradient(180deg, transparent 0%, rgba(20, 20, 20, 0.8) 100%);
          color: var(--bg-pure);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .image-overlay-bar .mono-text {
          color: #ffffff;
        }

        .project-content-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .project-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .project-index-num {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-green);
        }

        .project-category-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          padding: 4px 10px;
          background-color: var(--bg-gray);
          color: var(--text-muted);
          border: 1px solid var(--border-light);
        }

        .project-title {
          font-size: 2.2rem;
          color: var(--accent-charcoal);
          margin-bottom: 16px;
          transition: color 0.3s ease;
        }

        .project-layout-item:hover .project-title {
          color: var(--accent-green);
        }

        .project-description {
          font-size: 1.02rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin-bottom: 24px;
        }

        .project-mini-specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 16px;
          background-color: var(--bg-warm);
          border: 1px solid var(--border-light);
          margin-bottom: 24px;
        }

        .mini-spec-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mini-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-light);
        }

        .mini-val {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .mini-val.highlight {
          color: var(--accent-green);
        }

        .project-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--border-light);
        }

        .explore-link {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent-charcoal);
          display: flex;
          align-items: center;
          gap: 6px;
          transition: transform 0.3s ease;
        }

        .arrow-icon {
          transition: transform 0.3s ease;
        }

        .project-layout-item:hover .arrow-icon {
          transform: translate(3px, -3px);
          color: var(--accent-green);
        }

        /* LAYOUT VARIATIONS */
        /* 1. Full-width Hero Layout */
        .layout-full {
          grid-template-columns: 1fr;
        }
        .layout-full .project-image-box {
          height: 480px;
        }

        /* 2. Split 50/50 Layout */
        .layout-split {
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
        }
        .layout-split .project-image-box {
          height: 420px;
        }

        /* 3. Horizontal Offset Layout */
        .layout-horizontal {
          grid-template-columns: 0.85fr 1.15fr;
          align-items: center;
        }
        .layout-horizontal .project-image-box {
          height: 380px;
          order: 2;
        }
        .layout-horizontal .project-content-box {
          order: 1;
        }

        /* 4. Asymmetric Layout */
        .layout-asymmetric {
          grid-template-columns: 1.2fr 0.8fr;
        }
        .layout-asymmetric .project-image-box {
          height: 440px;
        }

        @media (max-width: 1024px) {
          .project-layout-item {
            grid-template-columns: 1fr !important;
          }
          .layout-horizontal .project-image-box {
            order: 1 !important;
          }
          .layout-horizontal .project-content-box {
            order: 2 !important;
          }
          .project-image-box {
            height: 320px !important;
          }
        }

        @media (max-width: 640px) {
          .filter-bar {
            padding: 12px 14px;
            margin-bottom: 30px;
          }
          .filter-buttons {
            gap: 6px;
          }
          .filter-btn {
            padding: 6px 12px;
            font-size: 0.7rem;
          }
          .projects-gallery-list {
            gap: 32px;
          }
          .project-layout-item {
            padding: 16px;
            gap: 20px;
          }
          .project-title {
            font-size: 1.4rem;
            margin-bottom: 10px;
          }
          .project-description {
            font-size: 0.92rem;
            margin-bottom: 16px;
          }
          .project-mini-specs {
            grid-template-columns: 1fr;
            gap: 10px;
            padding: 12px;
            margin-bottom: 16px;
          }
          .project-image-box {
            height: 220px !important;
          }
          .image-overlay-bar {
            padding: 8px 12px;
            font-size: 0.65rem;
          }
        }
      `})]})}function Mg({project:e,onClose:t}){var a,l,n,i,s,u;return J.useEffect(()=>{const o=d=>{d.key==="Escape"&&t()};return window.addEventListener("keydown",o),document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",o),document.body.style.overflow="auto"}},[t]),e?c.jsxs("div",{className:"modal-backdrop",onClick:t,children:[c.jsxs("div",{className:"project-modal-card",onClick:o=>o.stopPropagation(),children:[c.jsxs("div",{className:"modal-top-bar",children:[c.jsxs("div",{className:"top-bar-left",children:[c.jsxs("span",{className:"modal-project-num",children:["PROJECT ",e.num]}),c.jsx("span",{className:"top-bar-divider",children:"|"}),c.jsx("span",{className:"mono-text",children:e.category})]}),c.jsx("button",{className:"modal-close-btn",onClick:t,"aria-label":"Close modal",children:c.jsx(bi,{size:22})})]}),c.jsxs("div",{className:"modal-scroll-content",children:[c.jsxs("div",{className:"modal-hero-image-wrap",children:[c.jsx("img",{src:e.image,alt:e.name,className:"modal-hero-img"}),c.jsxs("div",{className:"modal-hero-overlay",children:[c.jsx("h2",{className:"modal-project-title display-title",children:e.name}),c.jsxs("div",{className:"modal-meta-pills",children:[c.jsxs("span",{className:"meta-pill",children:[c.jsx(Na,{size:12})," ",e.location]}),c.jsxs("span",{className:"meta-pill",children:[c.jsx(R0,{size:12})," ",e.year]}),c.jsxs("span",{className:"meta-pill badge-green",children:[c.jsx(Tu,{size:12})," ",e.status]})]})]})]}),c.jsxs("div",{className:"modal-grid",children:[c.jsxs("div",{className:"modal-left",children:[c.jsxs("div",{className:"modal-section-block",children:[c.jsx("h3",{className:"block-title",children:"PROJECT OVERVIEW"}),c.jsx("p",{className:"block-text",children:e.fullOverview})]}),c.jsxs("div",{className:"modal-section-block",children:[c.jsx("h3",{className:"block-title",children:"ARCHITECTURAL DESIGN CONCEPT"}),c.jsx("p",{className:"block-text",children:e.designConcept})]}),c.jsxs("div",{className:"blueprint-diagram-box",children:[c.jsxs("div",{className:"diagram-header",children:[c.jsx("span",{className:"mono-text",children:"ARCHITECTURAL BLUEPRINT SPECIFICATION // AXONOMETRIC"}),c.jsx(Au,{size:14,className:"icon-green"})]}),c.jsx("div",{className:"blueprint-svg-container",children:c.jsxs("svg",{className:"blueprint-svg",viewBox:"0 0 400 180",xmlns:"http://www.w3.org/2000/svg",children:[c.jsx("pattern",{id:"grid",width:"20",height:"20",patternUnits:"userSpaceOnUse",children:c.jsx("path",{d:"M 20 0 L 0 0 0 20",fill:"none",stroke:"#e0e0e0",strokeWidth:"0.5"})}),c.jsx("rect",{width:"100%",height:"100%",fill:"url(#grid)"}),c.jsxs("g",{stroke:"#1B3629",strokeWidth:"1.5",fill:"none",children:[c.jsx("polygon",{points:"120,130 240,160 320,110 200,80",fill:"rgba(27,54,41,0.05)"}),c.jsx("polygon",{points:"120,130 200,80 200,30 120,80",fill:"rgba(27,54,41,0.08)"}),c.jsx("polygon",{points:"200,80 320,110 320,60 200,30",fill:"rgba(27,54,41,0.03)"}),c.jsx("line",{x1:"240",y1:"160",x2:"240",y2:"110",strokeDasharray:"3,3"}),c.jsx("line",{x1:"120",y1:"130",x2:"240",y2:"160",stroke:"#1B3629"}),c.jsx("line",{x1:"240",y1:"160",x2:"320",y2:"110",stroke:"#1B3629"}),c.jsx("line",{x1:"320",y1:"110",x2:"320",y2:"60",stroke:"#1B3629"}),c.jsx("line",{x1:"120",y1:"80",x2:"200",y2:"30",stroke:"#1B3629"}),c.jsx("line",{x1:"200",y1:"30",x2:"320",y2:"60",stroke:"#1B3629"}),c.jsx("line",{x1:"110",y1:"135",x2:"190",y2:"85",stroke:"#B05844",strokeWidth:"1",strokeDasharray:"2,2"}),c.jsx("text",{x:"140",y:"100",fill:"#B05844",fontSize:"10",fontFamily:"JetBrains Mono",children:"34.5m SOLAR AXIS"})]})]})}),c.jsx("div",{className:"diagram-footer",children:(a=e.diagrams)==null?void 0:a.map((o,d)=>c.jsxs("div",{className:"diagram-item",children:[c.jsxs("span",{className:"diag-label",children:[o.label,":"]}),c.jsx("span",{className:"diag-detail",children:o.detail})]},d))})]})]}),c.jsxs("div",{className:"modal-right",children:[c.jsxs("div",{className:"arch-card modal-side-card",children:[c.jsx("div",{className:"arch-corner-tick tick-tl"}),c.jsx("div",{className:"arch-corner-tick tick-tr"}),c.jsx("div",{className:"arch-corner-tick tick-bl"}),c.jsx("div",{className:"arch-corner-tick tick-br"}),c.jsx("h4",{className:"side-card-title",children:"PROJECT SPECIFICATIONS"}),c.jsxs("div",{className:"specs-list",children:[c.jsxs("div",{className:"spec-row",children:[c.jsx("span",{className:"spec-label",children:"Gross Floor Area"}),c.jsx("span",{className:"spec-val",children:(l=e.metrics)==null?void 0:l.area})]}),c.jsxs("div",{className:"spec-row",children:[c.jsx("span",{className:"spec-label",children:"Carbon Reduction"}),c.jsx("span",{className:"spec-val highlight",children:(n=e.metrics)==null?void 0:n.carbonReduction})]}),c.jsxs("div",{className:"spec-row",children:[c.jsx("span",{className:"spec-label",children:"Energy Standard"}),c.jsx("span",{className:"spec-val",children:(i=e.metrics)==null?void 0:i.energyRating})]}),c.jsxs("div",{className:"spec-row",children:[c.jsx("span",{className:"spec-label",children:"Timeline"}),c.jsx("span",{className:"spec-val",children:(s=e.metrics)==null?void 0:s.yearCompleted})]})]})]}),c.jsxs("div",{className:"arch-card modal-side-card",children:[c.jsx("h4",{className:"side-card-title",children:"SPECIFIED MATERIAL PALETTE"}),c.jsx("div",{className:"materials-list",children:(u=e.materials)==null?void 0:u.map((o,d)=>c.jsxs("div",{className:"mat-item",children:[c.jsx(fm,{size:14,className:"mat-icon"}),c.jsx("span",{children:o})]},d))})]}),c.jsx("div",{className:"modal-cta-box",children:c.jsxs("button",{className:"btn-primary full-width",onClick:t,children:[c.jsx("span",{children:"Return to Portfolio"}),c.jsx(E0,{size:16})]})})]})]})]})]}),c.jsx("style",{children:`
        .project-modal-card {
          width: 100%;
          max-width: 1100px;
          max-height: 90vh;
          background-color: var(--bg-pure);
          border: 1px solid var(--border-dark);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          animation: modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .modal-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 28px;
          border-bottom: 1px solid var(--border-light);
          background-color: var(--bg-warm);
        }

        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .modal-project-num {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-green);
        }

        .top-bar-divider {
          color: var(--border-medium);
        }

        .modal-close-btn {
          background: none;
          border: 1px solid var(--border-medium);
          padding: 6px;
          cursor: pointer;
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background-color: var(--accent-charcoal);
          color: var(--bg-pure);
        }

        .modal-scroll-content {
          overflow-y: auto;
          padding: 32px;
        }

        .modal-hero-image-wrap {
          position: relative;
          width: 100%;
          height: 380px;
          overflow: hidden;
          margin-bottom: 36px;
          border: 1px solid var(--border-medium);
        }

        .modal-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(18, 18, 18, 0.85) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
          color: var(--bg-pure);
        }

        .modal-project-title {
          font-size: 2.5rem;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .modal-meta-pills {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .meta-pill {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          padding: 6px 14px;
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .badge-green {
          background-color: var(--accent-green);
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 36px;
        }

        .modal-section-block {
          margin-bottom: 32px;
        }

        .block-title {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          color: var(--accent-green);
          margin-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 8px;
        }

        .block-text {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.7;
        }

        /* BLUEPRINT WIREFRAME */
        .blueprint-diagram-box {
          background-color: var(--bg-warm);
          border: 1px solid var(--border-light);
          padding: 20px;
          margin-top: 24px;
        }

        .diagram-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-light);
        }

        .icon-green {
          color: var(--accent-green);
        }

        .blueprint-svg-container {
          background-color: var(--bg-pure);
          border: 1px solid var(--border-medium);
          height: 180px;
          overflow: hidden;
        }

        .blueprint-svg {
          width: 100%;
          height: 100%;
        }

        .diagram-footer {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .diagram-item {
          display: flex;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
        }

        .diag-label {
          color: var(--accent-green);
          font-weight: 700;
        }

        .diag-detail {
          color: var(--text-muted);
        }

        /* RIGHT SIDE CARDS */
        .modal-side-card {
          margin-bottom: 24px;
        }

        .side-card-title {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          color: var(--text-main);
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-light);
        }

        .specs-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.88rem;
        }

        .spec-label {
          color: var(--text-muted);
        }

        .spec-val {
          font-family: var(--font-mono);
          font-weight: 600;
          color: var(--text-main);
        }

        .spec-val.highlight {
          color: var(--accent-green);
        }

        .materials-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .mat-icon {
          color: var(--accent-green);
        }

        .modal-cta-box {
          margin-top: 28px;
        }

        @media (max-width: 900px) {
          .modal-grid {
            grid-template-columns: 1fr;
          }
          .modal-hero-image-wrap {
            height: 260px;
          }
        }

        @media (max-width: 640px) {
          .modal-top-bar {
            padding: 12px 16px;
          }
          .modal-scroll-content {
            padding: 18px 14px;
          }
          .modal-hero-image-wrap {
            height: 200px;
            margin-bottom: 20px;
          }
          .modal-hero-overlay {
            padding: 16px;
          }
          .modal-project-title {
            font-size: 1.4rem;
            margin-bottom: 8px;
          }
          .meta-pill {
            padding: 4px 8px;
            font-size: 0.65rem;
          }
          .blueprint-diagram-box {
            padding: 14px;
          }
        }
      `})]}):null}function Og(){const e=J.useRef(null),t=a=>{if(e.current){const l=a==="left"?-380:380;e.current.scrollBy({left:l,behavior:"smooth"})}};return c.jsxs("section",{id:"experience",className:"arch-section experience-section",children:[c.jsx("div",{className:"arch-grid-lines"}),c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"section-header-bar",children:[c.jsxs("div",{className:"header-left",children:[c.jsx("span",{className:"section-number",children:"03"}),c.jsxs("div",{className:"header-titles",children:[c.jsx("span",{className:"section-label",children:"CAREER TRAJECTORY"}),c.jsx("h2",{className:"section-title display-title",children:"Professional Experience"})]})]}),c.jsxs("div",{className:"timeline-nav-buttons",children:[c.jsx("button",{className:"timeline-scroll-btn",onClick:()=>t("left"),"aria-label":"Scroll left",children:c.jsx(B0,{size:20})}),c.jsx("button",{className:"timeline-scroll-btn",onClick:()=>t("right"),"aria-label":"Scroll right",children:c.jsx(Y0,{size:20})})]})]}),c.jsxs("div",{className:"timeline-outer-wrapper",children:[c.jsx("div",{className:"timeline-track-line"}),c.jsx("div",{className:"timeline-scroll-container",ref:e,children:pm.map((a,l)=>c.jsxs("div",{className:"timeline-node-card arch-card",children:[c.jsx("div",{className:"arch-corner-tick tick-tl"}),c.jsx("div",{className:"arch-corner-tick tick-tr"}),c.jsx("div",{className:"arch-corner-tick tick-bl"}),c.jsx("div",{className:"arch-corner-tick tick-br"}),c.jsxs("div",{className:"node-pin-container",children:[c.jsx("div",{className:"node-pin"}),c.jsx("span",{className:"mono-text coord-text",children:a.coordinates})]}),c.jsxs("div",{className:"node-header",children:[c.jsx("span",{className:"node-period",children:a.period}),c.jsx("span",{className:"node-company-type",children:a.type})]}),c.jsx("h3",{className:"node-role",children:a.role}),c.jsxs("div",{className:"node-company-row",children:[c.jsx(D0,{size:16,className:"company-icon"}),c.jsx("span",{className:"company-name",children:a.company}),c.jsx("span",{className:"bullet-sep",children:"•"}),c.jsx(Na,{size:14,className:"location-icon"}),c.jsx("span",{className:"location-text",children:a.location})]}),c.jsx("p",{className:"node-summary",children:a.description}),c.jsxs("div",{className:"responsibilities-list",children:[c.jsx("span",{className:"mono-text list-title",children:"KEY DELIVERABLES:"}),a.responsibilities.map((n,i)=>c.jsxs("div",{className:"resp-item",children:[c.jsx(H0,{size:12,className:"resp-icon"}),c.jsx("span",{children:n})]},i))]})]},l))})]})]}),c.jsx("style",{children:`
        .experience-section {
          background-color: var(--bg-pure);
          border-bottom: 1px solid var(--border-light);
          overflow: hidden;
        }

        .timeline-nav-buttons {
          display: flex;
          gap: 10px;
        }

        .timeline-scroll-btn {
          width: 44px;
          height: 44px;
          background-color: var(--bg-pure);
          border: 1px solid var(--border-medium);
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .timeline-scroll-btn:hover {
          background-color: var(--accent-charcoal);
          color: var(--bg-pure);
          border-color: var(--accent-charcoal);
        }

        /* TIMELINE TRACK */
        .timeline-outer-wrapper {
          position: relative;
          padding-top: 40px;
        }

        .timeline-track-line {
          position: absolute;
          top: 70px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--border-medium);
          z-index: 1;
        }

        .timeline-scroll-container {
          display: flex;
          gap: 32px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 30px;
          padding-top: 10px;
          position: relative;
          z-index: 2;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }

        .timeline-node-card {
          flex: 0 0 380px;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-pure);
          margin-top: 30px;
          border-top: 3px solid var(--accent-green);
        }

        .node-pin-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: -46px;
          margin-bottom: 20px;
          position: relative;
        }

        .node-pin {
          width: 16px;
          height: 16px;
          background-color: var(--accent-green);
          border: 3px solid var(--bg-pure);
          outline: 1px solid var(--accent-green);
          border-radius: 50%;
        }

        .coord-text {
          font-size: 0.68rem;
          color: var(--text-light);
        }

        .node-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .node-period {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--accent-charcoal);
        }

        .node-company-type {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--accent-green);
          background-color: var(--bg-gray);
          padding: 4px 8px;
        }

        .node-role {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--accent-green);
          margin-bottom: 8px;
        }

        .node-company-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
        }

        .company-icon, .location-icon {
          color: var(--accent-charcoal);
        }

        .bullet-sep {
          color: var(--border-medium);
        }

        .node-summary {
          font-size: 0.95rem;
          color: var(--text-main);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .responsibilities-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px dashed var(--border-light);
        }

        .list-title {
          font-size: 0.7rem;
          color: var(--text-light);
        }

        .resp-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .resp-icon {
          color: var(--accent-green);
          margin-top: 3px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .timeline-nav-buttons {
            display: none;
          }
          .timeline-node-card {
            flex: 0 0 min(300px, 80vw);
            padding: 20px 16px;
            margin-top: 24px;
          }
          .node-role {
            font-size: 1.2rem;
          }
          .node-company-row {
            flex-wrap: wrap;
            font-size: 0.8rem;
            gap: 4px 6px;
          }
        }
      `})]})}function Cg(){const e=t=>t===0?c.jsx(fg,{size:18}):t===1?c.jsx(K0,{size:18}):t===2?c.jsx(jg,{size:18}):c.jsx(Tu,{size:18});return c.jsxs("section",{id:"expertise",className:"arch-section expertise-section",children:[c.jsx("div",{className:"arch-grid-lines"}),c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"section-header-bar",children:[c.jsxs("div",{className:"header-left",children:[c.jsx("span",{className:"section-number",children:"04"}),c.jsxs("div",{className:"header-titles",children:[c.jsx("span",{className:"section-label",children:"TECHNICAL COMPETENCIES"}),c.jsx("h2",{className:"section-title display-title",children:"Design Tools & Expertise"})]})]}),c.jsx("div",{className:"header-line"})]}),c.jsx("div",{className:"expertise-matrix-grid",children:hm.map((t,a)=>c.jsxs("div",{className:"expertise-cat-block arch-card",children:[c.jsx("div",{className:"arch-corner-tick tick-tl"}),c.jsx("div",{className:"arch-corner-tick tick-tr"}),c.jsx("div",{className:"arch-corner-tick tick-bl"}),c.jsx("div",{className:"arch-corner-tick tick-br"}),c.jsxs("div",{className:"cat-header",children:[c.jsxs("div",{className:"cat-title-left",children:[c.jsx("div",{className:"cat-icon",children:e(a)}),c.jsx("h3",{className:"cat-name",children:t.category})]}),c.jsx("span",{className:"mono-text cat-code",children:t.code})]}),c.jsx("div",{className:"skills-modular-list",children:t.skills.map((l,n)=>c.jsxs("div",{className:"skill-module-item",children:[c.jsxs("div",{className:"module-top",children:[c.jsx("span",{className:"skill-name",children:l.name}),c.jsx("span",{className:"skill-level-badge",children:l.level})]}),c.jsx("span",{className:"skill-spec-text",children:l.spec})]},n))})]},t.category))})]}),c.jsx("style",{children:`
        .expertise-section {
          background-color: var(--bg-warm);
          border-bottom: 1px solid var(--border-light);
        }

        .expertise-matrix-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .expertise-cat-block {
          background-color: var(--bg-pure);
          display: flex;
          flex-direction: column;
        }

        .cat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border-light);
        }

        .cat-title-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cat-icon {
          color: var(--accent-green);
          padding: 8px;
          background-color: var(--bg-gray);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cat-name {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--accent-charcoal);
          letter-spacing: -0.01em;
        }

        .cat-code {
          color: var(--accent-green);
        }

        .skills-modular-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .skill-module-item {
          background-color: var(--bg-warm);
          border: 1px solid var(--border-light);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .skill-module-item:hover {
          border-color: var(--accent-green);
          background-color: var(--bg-pure);
        }

        .module-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .skill-name {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .skill-level-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          padding: 3px 8px;
          background-color: var(--accent-charcoal);
          color: var(--bg-pure);
          letter-spacing: 0.05em;
        }

        .skill-spec-text {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .expertise-matrix-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .skills-modular-list {
            grid-template-columns: 1fr;
          }
          .cat-header {
            flex-wrap: wrap;
            gap: 8px;
            padding-bottom: 14px;
            margin-bottom: 16px;
          }
          .cat-name {
            font-size: 1.05rem;
          }
        }
      `})]})}function Dg(){return c.jsxs("section",{id:"education",className:"arch-section education-section",children:[c.jsx("div",{className:"arch-grid-lines"}),c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"section-header-bar",children:[c.jsxs("div",{className:"header-left",children:[c.jsx("span",{className:"section-number",children:"05"}),c.jsxs("div",{className:"header-titles",children:[c.jsx("span",{className:"section-label",children:"ACADEMIC BACKGROUND"}),c.jsx("h2",{className:"section-title display-title",children:"Academic Foundation"})]})]}),c.jsx("div",{className:"header-line"})]}),c.jsx("div",{className:"education-grid",children:gm.map((e,t)=>c.jsxs("div",{className:"education-card arch-card",children:[c.jsx("div",{className:"arch-corner-tick tick-tl"}),c.jsx("div",{className:"arch-corner-tick tick-tr"}),c.jsx("div",{className:"arch-corner-tick tick-bl"}),c.jsx("div",{className:"arch-corner-tick tick-br"}),c.jsxs("div",{className:"edu-top-bar",children:[c.jsx("div",{className:"edu-icon-wrap",children:c.jsx(sg,{size:24})}),c.jsx("div",{className:"edu-year-tag",children:c.jsx("span",{className:"mono-text",children:e.year})})]}),c.jsx("h3",{className:"edu-degree",children:e.degree}),c.jsxs("div",{className:"edu-institution-row",children:[c.jsx("span",{className:"inst-name",children:e.institution}),c.jsx("span",{className:"bullet-sep",children:"•"}),c.jsx("span",{className:"inst-loc",children:e.location})]}),c.jsxs("div",{className:"edu-details-box",children:[c.jsxs("div",{className:"detail-item",children:[c.jsx(O0,{size:14,className:"detail-icon"}),c.jsx("span",{className:"detail-label",children:"Specialization:"}),c.jsx("span",{className:"detail-text",children:e.focus})]}),c.jsxs("div",{className:"detail-item",children:[c.jsx(rm,{size:14,className:"detail-icon"}),c.jsx("span",{className:"detail-label",children:"Distinction:"}),c.jsx("span",{className:"detail-text highlight",children:e.honors})]})]}),c.jsxs("div",{className:"edu-thesis-box",children:[c.jsx("span",{className:"mono-text thesis-label",children:"ACADEMIC THESIS"}),c.jsxs("p",{className:"thesis-text",children:['"',e.thesis,'"']})]}),c.jsx("div",{className:"edu-type-footer",children:c.jsx("span",{className:"mono-text",children:e.type})})]},t))})]}),c.jsx("style",{children:`
        .education-section {
          background-color: var(--bg-pure);
          border-bottom: 1px solid var(--border-light);
        }

        .education-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 36px;
        }

        .education-card {
          background-color: var(--bg-pure);
          display: flex;
          flex-direction: column;
        }

        .edu-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .edu-icon-wrap {
          width: 50px;
          height: 50px;
          background-color: var(--accent-charcoal);
          color: var(--bg-pure);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .edu-year-tag {
          padding: 6px 14px;
          background-color: var(--bg-gray);
          border: 1px solid var(--border-light);
        }

        .edu-degree {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--accent-charcoal);
          margin-bottom: 10px;
          line-height: 1.25;
        }

        .edu-institution-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          color: var(--accent-green);
          font-weight: 600;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }

        .edu-details-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.9rem;
        }

        .detail-icon {
          color: var(--accent-green);
          margin-top: 3px;
          flex-shrink: 0;
        }

        .detail-label {
          font-weight: 600;
          color: var(--text-main);
        }

        .detail-text {
          color: var(--text-muted);
        }

        .detail-text.highlight {
          color: var(--accent-green);
          font-weight: 600;
        }

        .edu-thesis-box {
          background-color: var(--bg-warm);
          border-left: 3px solid var(--accent-green);
          padding: 16px 20px;
          margin-top: auto;
          margin-bottom: 20px;
        }

        .thesis-label {
          font-size: 0.68rem;
          color: var(--accent-green);
          margin-bottom: 6px;
          display: block;
        }

        .thesis-text {
          font-size: 0.9rem;
          font-style: italic;
          color: var(--text-main);
          line-height: 1.5;
        }

        .edu-type-footer {
          padding-top: 14px;
          border-top: 1px dashed var(--border-light);
          text-align: right;
        }

        @media (max-width: 900px) {
          .education-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .edu-degree {
            font-size: 1.3rem;
          }
          .edu-institution-row {
            flex-wrap: wrap;
            gap: 4px 8px;
            margin-bottom: 16px;
            padding-bottom: 12px;
          }
          .edu-thesis-box {
            padding: 12px 14px;
          }
        }
      `})]})}function _g(){return c.jsxs("section",{id:"research",className:"arch-section research-section",children:[c.jsx("div",{className:"arch-grid-lines"}),c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"section-header-bar",children:[c.jsxs("div",{className:"header-left",children:[c.jsx("span",{className:"section-number",children:"06"}),c.jsxs("div",{className:"header-titles",children:[c.jsx("span",{className:"section-label",children:"ACADEMIC & PUBLIC ENGAGEMENT"}),c.jsx("h2",{className:"section-title display-title",children:"Research & Public Work"})]})]}),c.jsx("div",{className:"header-line"})]}),c.jsx("div",{className:"research-posters-grid",children:ir.projects.map(e=>c.jsxs("div",{className:"poster-card arch-card",children:[c.jsx("div",{className:"arch-corner-tick tick-tl"}),c.jsx("div",{className:"arch-corner-tick tick-tr"}),c.jsx("div",{className:"arch-corner-tick tick-bl"}),c.jsx("div",{className:"arch-corner-tick tick-br"}),c.jsxs("div",{className:"poster-top-bar",children:[c.jsx("span",{className:"mono-text poster-code",children:e.code}),c.jsx("span",{className:"mono-text poster-year",children:e.year})]}),c.jsx("h3",{className:"poster-title display-title",children:e.title}),c.jsx("div",{className:"poster-subtitle-box",children:c.jsx("p",{className:"poster-subtitle",children:e.subtitle})}),c.jsx("p",{className:"poster-summary",children:e.summary}),c.jsxs("div",{className:"poster-footer",children:[c.jsx("span",{className:"mono-text poster-status",children:"PUBLISHED MONOGRAPH"}),c.jsx(ag,{size:16,className:"poster-icon"})]})]},e.code))}),c.jsxs("div",{className:"exhibitions-block",children:[c.jsxs("div",{className:"exhibitions-header",children:[c.jsx("h3",{className:"exhibitions-title",children:"SELECTED EXHIBITIONS & CURATED PAVILIONS"}),c.jsx("span",{className:"mono-text",children:"2021 — 2025"})]}),c.jsx("div",{className:"exhibitions-list",children:ir.exhibitions.map((e,t)=>c.jsxs("div",{className:"exhibition-row",children:[c.jsxs("div",{className:"exh-left",children:[c.jsx("span",{className:"exh-year",children:e.year}),c.jsx("span",{className:"bullet-sep",children:"•"}),c.jsx("h4",{className:"exh-name",children:e.title})]}),c.jsxs("div",{className:"exh-right",children:[c.jsxs("div",{className:"exh-loc",children:[c.jsx(Na,{size:14}),c.jsx("span",{children:e.location})]}),c.jsx("span",{className:"exh-role",children:e.role}),c.jsx(Eu,{size:16,className:"exh-arrow"})]})]},t))})]})]}),c.jsx("style",{children:`
        .research-section {
          background-color: var(--bg-warm);
          border-bottom: 1px solid var(--border-light);
        }

        .research-posters-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-bottom: 70px;
        }

        .poster-card {
          background-color: var(--bg-pure);
          display: flex;
          flex-direction: column;
          padding: 36px 28px;
          border: 1px solid var(--border-light);
          position: relative;
          transition: all 0.3s ease;
        }

        .poster-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-charcoal);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.05);
        }

        .poster-top-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
        }

        .poster-code {
          color: var(--accent-green);
          font-weight: 700;
        }

        .poster-year {
          color: var(--text-light);
        }

        .poster-title {
          font-size: 2.2rem;
          line-height: 1;
          color: var(--accent-charcoal);
          margin-bottom: 16px;
        }

        .poster-subtitle-box {
          border-left: 2px solid var(--accent-green);
          padding-left: 12px;
          margin-bottom: 16px;
        }

        .poster-subtitle {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
          line-height: 1.4;
        }

        .poster-summary {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .poster-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px dashed var(--border-light);
        }

        .poster-status {
          font-size: 0.68rem;
          color: var(--accent-green);
        }

        .poster-icon {
          color: var(--accent-charcoal);
        }

        /* EXHIBITIONS BLOCK */
        .exhibitions-block {
          background-color: var(--bg-pure);
          border: 1px solid var(--border-light);
          padding: 40px;
        }

        .exhibitions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 2px solid var(--accent-charcoal);
        }

        .exhibitions-title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--accent-charcoal);
        }

        .exhibitions-list {
          display: flex;
          flex-direction: column;
        }

        .exhibition-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid var(--border-light);
          transition: background-color 0.2s ease;
        }

        .exhibition-row:last-child {
          border-bottom: none;
        }

        .exh-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .exh-year {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--accent-green);
        }

        .exh-name {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .exh-right {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .exh-loc {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .exh-role {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .exh-arrow {
          color: var(--accent-charcoal);
          transition: transform 0.2s ease;
        }

        .exhibition-row:hover .exh-arrow {
          transform: translate(3px, -3px);
          color: var(--accent-green);
        }

        @media (max-width: 1024px) {
          .research-posters-grid {
            grid-template-columns: 1fr;
          }
          .exhibition-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .exh-right {
            gap: 16px;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 640px) {
          .poster-card {
            padding: 24px 18px;
          }
          .poster-title {
            font-size: 1.6rem;
          }
          .exhibitions-block {
            padding: 24px 16px;
          }
          .exhibitions-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .exhibitions-title {
            font-size: 1.05rem;
          }
          .exh-left {
            flex-wrap: wrap;
            gap: 8px;
          }
          .exh-name {
            font-size: 1.05rem;
          }
        }
      `})]})}function Rg(){return c.jsxs("section",{id:"recognition",className:"arch-section recognition-section",children:[c.jsx("div",{className:"arch-grid-lines"}),c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"section-header-bar",children:[c.jsxs("div",{className:"header-left",children:[c.jsx("span",{className:"section-number",children:"07"}),c.jsxs("div",{className:"header-titles",children:[c.jsx("span",{className:"section-label",children:"AWARDS & HONORS"}),c.jsx("h2",{className:"section-title display-title",children:"Recognition"})]})]}),c.jsx("div",{className:"header-line"})]}),c.jsx("div",{className:"recognition-list",children:vm.map((e,t)=>c.jsxs("div",{className:"award-row",children:[c.jsx("div",{className:"award-year-col",children:c.jsx("span",{className:"award-year-text",children:e.year})}),c.jsxs("div",{className:"award-info-col",children:[c.jsx("h3",{className:"award-title-text",children:e.title}),c.jsxs("div",{className:"award-org-meta",children:[c.jsx("span",{className:"award-org-name",children:e.organization}),c.jsx("span",{className:"bullet-sep",children:"•"}),c.jsx(Na,{size:12,className:"meta-icon"}),c.jsx("span",{className:"award-location",children:e.location})]})]}),c.jsxs("div",{className:"award-project-ref",children:[c.jsx("span",{className:"mono-text ref-label",children:"NOMINATED PROJECT:"}),c.jsx("span",{className:"ref-name",children:e.projectRef})]})]},t))}),c.jsxs("div",{className:"recognition-disclaimer-box",children:[c.jsx(L0,{size:18,className:"disclaimer-icon"}),c.jsx("p",{className:"disclaimer-text",children:'"All awards, honors, and organizations displayed in this template are fictional demonstration content."'})]})]}),c.jsx("style",{children:`
        .recognition-section {
          background-color: var(--bg-pure);
          border-bottom: 1px solid var(--border-light);
        }

        .recognition-list {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-light);
          background-color: var(--bg-pure);
          margin-bottom: 40px;
        }

        .award-row {
          display: grid;
          grid-template-columns: 140px 1.5fr 1fr;
          gap: 32px;
          align-items: center;
          padding: 28px 36px;
          border-bottom: 1px solid var(--border-light);
          transition: background-color 0.2s ease;
        }

        .award-row:last-child {
          border-bottom: none;
        }

        .award-row:hover {
          background-color: var(--bg-warm);
        }

        .award-year-text {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--accent-green);
          line-height: 1;
        }

        .award-title-text {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--accent-charcoal);
          margin-bottom: 6px;
        }

        .award-org-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .award-org-name {
          font-weight: 600;
          color: var(--text-main);
        }

        .award-project-ref {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background-color: var(--bg-gray);
          padding: 12px 18px;
          border-left: 2px solid var(--accent-green);
        }

        .ref-label {
          font-size: 0.65rem;
          color: var(--accent-green);
        }

        .ref-name {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .recognition-disclaimer-box {
          display: flex;
          align-items: center;
          gap: 14px;
          background-color: var(--bg-warm);
          border: 1px solid var(--border-light);
          padding: 18px 24px;
        }

        .disclaimer-icon {
          color: var(--accent-terracotta);
          flex-shrink: 0;
        }

        .disclaimer-text {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
          margin: 0;
        }

        @media (max-width: 900px) {
          .award-row {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 20px 16px;
          }
          .award-year-text {
            font-size: 1.75rem;
          }
          .award-title-text {
            font-size: 1.2rem;
          }
          .award-org-meta {
            flex-wrap: wrap;
          }
        }
      `})]})}function Ug(){const[e,t]=J.useState(!1),[a,l]=J.useState({name:"",email:"",projectType:"Architectural Design",message:""}),n=s=>{l({...a,[s.target.name]:s.target.value})},i=s=>{s.preventDefault(),a.name&&a.email&&a.message&&t(!0)};return c.jsxs("section",{id:"contact",className:"arch-section contact-section",children:[c.jsx("div",{className:"contact-grid-anim"}),c.jsxs("div",{className:"container relative-z",children:[c.jsxs("div",{className:"contact-top-banner",children:[c.jsx("span",{className:"section-label",children:"GET IN TOUCH"}),c.jsxs("h2",{className:"contact-heading display-title",children:["Let's Shape ",c.jsx("br",{}),"What Comes Next."]}),c.jsx("p",{className:"contact-subhead",children:'"Open to architectural collaborations, design conversations, and future-focused projects."'})]}),c.jsxs("div",{className:"contact-main-grid",children:[c.jsxs("div",{className:"contact-info-panel arch-card",children:[c.jsx("div",{className:"arch-corner-tick tick-tl"}),c.jsx("div",{className:"arch-corner-tick tick-tr"}),c.jsx("div",{className:"arch-corner-tick tick-bl"}),c.jsx("div",{className:"arch-corner-tick tick-br"}),c.jsx("h3",{className:"info-panel-title",children:"STUDIO DIRECTORY"}),c.jsxs("div",{className:"info-blocks-list",children:[c.jsxs("div",{className:"info-block-item",children:[c.jsx("span",{className:"mono-text block-label",children:"EMAIL INQUIRIES"}),c.jsxs("a",{href:`mailto:${V.email}`,className:"info-value-link",children:[c.jsx(mm,{size:16}),c.jsx("span",{children:V.email})]})]}),c.jsxs("div",{className:"info-block-item",children:[c.jsx("span",{className:"mono-text block-label",children:"STUDIO LOCATION"}),c.jsxs("div",{className:"info-value-text",children:[c.jsx(Na,{size:16}),c.jsx("span",{children:V.studioAddress})]})]}),c.jsxs("div",{className:"info-block-item",children:[c.jsx("span",{className:"mono-text block-label",children:"NETWORK & ARCHIVE"}),c.jsxs("div",{className:"info-value-text",children:[c.jsx(dm,{size:16}),c.jsx("span",{children:"Copenhagen Architectural Registry / AV-2026"})]})]})]}),c.jsxs("div",{className:"studio-availability-box",children:[c.jsx("div",{className:"pulse-dot"}),c.jsx("span",{className:"mono-text",children:"ACCEPTING SELECT COMMISSIONS FOR 2026/2027"})]})]}),c.jsxs("div",{className:"contact-form-panel arch-card",children:[c.jsx("div",{className:"arch-corner-tick tick-tl"}),c.jsx("div",{className:"arch-corner-tick tick-tr"}),c.jsx("div",{className:"arch-corner-tick tick-bl"}),c.jsx("div",{className:"arch-corner-tick tick-br"}),e?c.jsxs("div",{className:"form-success-state",children:[c.jsx(fm,{size:48,className:"success-icon"}),c.jsx("h3",{className:"success-title",children:"Message Transmitted"}),c.jsxs("p",{className:"success-text",children:["Thank you, ",a.name,'. Your architectural inquiry regarding "',a.projectType,'" has been received. Adrian will respond within 48 business hours.']}),c.jsx("button",{className:"btn-outline",onClick:()=>{t(!1),l({name:"",email:"",projectType:"Architectural Design",message:""})},children:"Send Another Inquiry"})]}):c.jsxs("form",{onSubmit:i,className:"underline-form",children:[c.jsxs("div",{className:"form-group",children:[c.jsx("label",{className:"mono-text input-label",children:"01 // YOUR NAME"}),c.jsx("input",{type:"text",name:"name",required:!0,placeholder:"e.g. Elena Rostova",value:a.name,onChange:n,className:"underline-input"})]}),c.jsxs("div",{className:"form-group",children:[c.jsx("label",{className:"mono-text input-label",children:"02 // EMAIL ADDRESS"}),c.jsx("input",{type:"email",name:"email",required:!0,placeholder:"e.g. elena@studio.example",value:a.email,onChange:n,className:"underline-input"})]}),c.jsxs("div",{className:"form-group",children:[c.jsx("label",{className:"mono-text input-label",children:"03 // PROJECT TYPOLOGY"}),c.jsxs("select",{name:"projectType",value:a.projectType,onChange:n,className:"underline-select",children:[c.jsx("option",{value:"Architectural Design",children:"Architectural Design & Planning"}),c.jsx("option",{value:"Urban Regeneration",children:"Urban Regeneration / Masterplan"}),c.jsx("option",{value:"Sustainability Advisory",children:"Sustainability & Material Research"}),c.jsx("option",{value:"Public Keynote / Jury",children:"Public Keynote / Guest Lecture"})]})]}),c.jsxs("div",{className:"form-group",children:[c.jsx("label",{className:"mono-text input-label",children:"04 // PROJECT DETAILS & SCOPE"}),c.jsx("textarea",{name:"message",required:!0,rows:"4",placeholder:"Describe site context, timeline, or collaboration parameters...",value:a.message,onChange:n,className:"underline-textarea"})]}),c.jsxs("button",{type:"submit",className:"btn-primary full-width submit-btn",children:[c.jsx("span",{children:"Begin a Conversation"}),c.jsx(yg,{size:16})]})]})]})]})]}),c.jsx("style",{children:`
        .contact-section {
          background-color: var(--bg-warm);
          padding-top: 120px;
          padding-bottom: 140px;
        }

        .contact-grid-anim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: 
            linear-gradient(to right, rgba(27, 54, 41, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(27, 54, 41, 0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridPan 60s linear infinite;
        }

        @keyframes gridPan {
          from { background-position: 0 0; }
          to { background-position: 500px 500px; }
        }

        .relative-z {
          position: relative;
          z-index: 2;
        }

        .contact-top-banner {
          margin-bottom: 60px;
        }

        .contact-heading {
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 0.95;
          margin-top: 16px;
          margin-bottom: 24px;
          color: var(--accent-charcoal);
        }

        .contact-subhead {
          font-size: 1.2rem;
          color: var(--text-muted);
          max-width: 620px;
          line-height: 1.6;
        }

        .contact-main-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 40px;
        }

        /* INFO PANEL */
        .contact-info-panel {
          background-color: var(--bg-pure);
          display: flex;
          flex-direction: column;
          padding: 40px;
        }

        .info-panel-title {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          color: var(--accent-green);
          margin-bottom: 32px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
        }

        .info-blocks-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-bottom: 40px;
        }

        .info-block-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .block-label {
          font-size: 0.7rem;
          color: var(--text-light);
        }

        .info-value-link {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--accent-charcoal);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.2s ease;
        }

        .info-value-link:hover {
          color: var(--accent-green);
        }

        .info-value-text {
          font-size: 1rem;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .studio-availability-box {
          margin-top: auto;
          padding: 16px 20px;
          background-color: var(--bg-warm);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pulse-dot {
          width: 10px;
          height: 10px;
          background-color: var(--accent-green);
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(27, 54, 41, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(27, 54, 41, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(27, 54, 41, 0); }
          100% { box-shadow: 0 0 0 0 rgba(27, 54, 41, 0); }
        }

        /* FORM PANEL */
        .contact-form-panel {
          background-color: var(--bg-pure);
          padding: 40px;
        }

        .underline-form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-label {
          font-size: 0.72rem;
          color: var(--accent-green);
        }

        .underline-input, .underline-select, .underline-textarea {
          width: 100%;
          border: none;
          border-bottom: 2px solid var(--border-medium);
          padding: 12px 0;
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--text-main);
          background: transparent;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .underline-input:focus, .underline-select:focus, .underline-textarea:focus {
          border-color: var(--accent-green);
        }

        .underline-select {
          cursor: pointer;
        }

        .submit-btn {
          margin-top: 16px;
        }

        .form-success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          color: var(--accent-green);
          margin-bottom: 20px;
        }

        .success-title {
          font-size: 1.8rem;
          color: var(--accent-charcoal);
          margin-bottom: 14px;
        }

        .success-text {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 30px;
        }

        @media (max-width: 900px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .contact-section {
            padding-top: 60px;
            padding-bottom: 70px;
          }
          .contact-heading {
            font-size: clamp(2.2rem, 7vw, 3.5rem);
            line-height: 1.05;
          }
          .contact-subhead {
            font-size: 1rem;
          }
          .contact-info-panel, .contact-form-panel {
            padding: 24px 18px;
          }
          .info-value-link {
            font-size: 1.05rem;
            word-break: break-all;
          }
          .info-blocks-list {
            gap: 24px;
            margin-bottom: 28px;
          }
        }
      `})]})}function Hg(){const e=t=>{const a=document.getElementById(t);if(a){const n=document.body.getBoundingClientRect().top,u=a.getBoundingClientRect().top-n-80;window.scrollTo({top:u,behavior:"smooth"})}};return c.jsxs("footer",{className:"arch-footer",children:[c.jsxs("div",{className:"container",children:[c.jsxs("div",{className:"footer-top-grid",children:[c.jsxs("div",{className:"footer-left",children:[c.jsxs("div",{className:"footer-brand",children:[c.jsx("div",{className:"monogram-box",children:"AV"}),c.jsxs("div",{className:"brand-text",children:[c.jsx("span",{className:"brand-name",children:V.name}),c.jsx("span",{className:"brand-title",children:V.profession})]})]}),c.jsx("p",{className:"footer-tagline",children:V.tagline})]}),c.jsxs("div",{className:"footer-center",children:[c.jsxs("div",{className:"footer-nav-col",children:[c.jsx("span",{className:"mono-text nav-col-title",children:"NAVIGATION"}),c.jsx("button",{onClick:()=>e("profile"),className:"footer-nav-link",children:"Profile"}),c.jsx("button",{onClick:()=>e("practice"),className:"footer-nav-link",children:"Practice Philosophy"}),c.jsx("button",{onClick:()=>e("projects"),className:"footer-nav-link",children:"Selected Works"}),c.jsx("button",{onClick:()=>e("experience"),className:"footer-nav-link",children:"Career Experience"})]}),c.jsxs("div",{className:"footer-nav-col",children:[c.jsx("span",{className:"mono-text nav-col-title",children:"ARCHIVE"}),c.jsx("button",{onClick:()=>e("expertise"),className:"footer-nav-link",children:"Design Expertise"}),c.jsx("button",{onClick:()=>e("education"),className:"footer-nav-link",children:"Academic Foundation"}),c.jsx("button",{onClick:()=>e("research"),className:"footer-nav-link",children:"Research & Public Work"}),c.jsx("button",{onClick:()=>e("contact"),className:"footer-nav-link",children:"Contact Studio"})]})]}),c.jsx("div",{className:"footer-right",children:c.jsxs("div",{className:"spec-card",children:[c.jsx("span",{className:"mono-text",children:"LOCATION MATRIX"}),c.jsx("span",{className:"spec-val",children:"Copenhagen / Denmark"}),c.jsx("span",{className:"mono-text mt-12",children:"SYSTEM REVISION"}),c.jsx("span",{className:"spec-val",children:"ARCH-VER 2026.04"})]})})]}),c.jsxs("div",{className:"footer-bottom-bar",children:[c.jsxs("span",{className:"copyright-text",children:["© 2026 ",V.name,". All Rights Reserved."]}),c.jsxs("p",{className:"legal-disclaimer",children:['"',V.disclaimer,'"']})]})]}),c.jsx("style",{children:`
        .arch-footer {
          background-color: var(--bg-pure);
          border-top: 1px solid var(--border-dark);
          padding-top: 80px;
          padding-bottom: 40px;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr 0.8fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-tagline {
          font-size: 0.95rem;
          color: var(--text-muted);
          max-width: 320px;
          line-height: 1.5;
        }

        .footer-center {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .footer-nav-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nav-col-title {
          font-size: 0.7rem;
          color: var(--accent-green);
          margin-bottom: 6px;
        }

        .footer-nav-link {
          background: none;
          border: none;
          text-align: left;
          font-size: 0.9rem;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .footer-nav-link:hover {
          color: var(--accent-green);
        }

        .footer-right {
          display: flex;
          flex-direction: column;
        }

        .spec-card {
          background-color: var(--bg-warm);
          border: 1px solid var(--border-light);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mt-12 {
          margin-top: 12px;
        }

        .spec-val {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--accent-charcoal);
        }

        .footer-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 32px;
          border-top: 1px solid var(--border-light);
          flex-wrap: wrap;
          gap: 16px;
        }

        .copyright-text {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--accent-charcoal);
          font-weight: 600;
        }

        .legal-disclaimer {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-light);
          max-width: 600px;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 640px) {
          .arch-footer {
            padding-top: 50px;
            padding-bottom: 30px;
          }
          .footer-top-grid {
            gap: 30px;
            margin-bottom: 36px;
          }
          .footer-center {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `})]})}function wg({onClose:e}){const t=()=>{window.print()};return c.jsxs("div",{className:"modal-backdrop no-print-backdrop",onClick:e,children:[c.jsxs("div",{className:"cv-modal-card",onClick:a=>a.stopPropagation(),children:[c.jsxs("div",{className:"cv-top-bar no-print",children:[c.jsx("div",{className:"cv-top-title",children:c.jsx("span",{className:"mono-text",children:"ADRIAN VALE — CURRICULUM VITAE (PDF / PRINT VIEW)"})}),c.jsxs("div",{className:"cv-top-actions",children:[c.jsxs("button",{className:"btn-primary print-action-btn",onClick:t,children:[c.jsx(vg,{size:16}),c.jsx("span",{children:"Print / Download PDF"})]}),c.jsx("button",{className:"modal-close-btn",onClick:e,"aria-label":"Close CV Modal",children:c.jsx(bi,{size:20})})]})]}),c.jsxs("div",{className:"cv-document-body",id:"printable-cv",children:[c.jsxs("header",{className:"cv-doc-header",children:[c.jsxs("div",{className:"header-main",children:[c.jsx("h1",{className:"cv-name",children:V.name}),c.jsx("h2",{className:"cv-title-sub",children:V.profession}),c.jsxs("p",{className:"cv-tagline-text",children:['"',V.tagline,'"']})]}),c.jsxs("div",{className:"header-contact-meta",children:[c.jsxs("div",{className:"meta-item",children:[c.jsx(Na,{size:12})," ",V.location]}),c.jsxs("div",{className:"meta-item",children:[c.jsx(mm,{size:12})," ",V.email]}),c.jsxs("div",{className:"meta-item",children:[c.jsx(hg,{size:12})," ",V.phone]}),c.jsxs("div",{className:"meta-item",children:[c.jsx(dm,{size:12})," adrianvale.example"]})]})]}),c.jsx("hr",{className:"cv-divider"}),c.jsxs("section",{className:"cv-sec",children:[c.jsx("h3",{className:"cv-sec-title",children:"PROFESSIONAL PROFILE"}),c.jsxs("p",{className:"cv-summary-text",children:[V.heroStatement," With over ",V.experienceYears," of experience heading sustainable mass-timber developments, public cultural pavilions, and urban regeneration masterplans in Denmark and Sweden, Adrian Vale synthesizes ecological site analysis, human ergonomics, and parametric daylighting."]})]}),c.jsxs("section",{className:"cv-sec",children:[c.jsx("h3",{className:"cv-sec-title",children:"CAREER EXPERIENCE"}),c.jsx("div",{className:"cv-items-stack",children:pm.map((a,l)=>c.jsxs("div",{className:"cv-exp-item",children:[c.jsxs("div",{className:"exp-line-header",children:[c.jsxs("div",{className:"exp-role-co",children:[c.jsx("span",{className:"exp-role-title",children:a.role})," — ",c.jsx("span",{className:"exp-co",children:a.company})]}),c.jsx("span",{className:"exp-date",children:a.period})]}),c.jsxs("div",{className:"exp-loc-line",children:[a.location," | ",a.type]}),c.jsx("ul",{className:"exp-bullets",children:a.responsibilities.map((n,i)=>c.jsx("li",{children:n},i))})]},l))})]}),c.jsxs("section",{className:"cv-sec",children:[c.jsx("h3",{className:"cv-sec-title",children:"ACADEMIC FOUNDATION"}),c.jsx("div",{className:"cv-items-stack",children:gm.map((a,l)=>c.jsxs("div",{className:"cv-edu-item",children:[c.jsxs("div",{className:"exp-line-header",children:[c.jsx("span",{className:"exp-role-title",children:a.degree}),c.jsx("span",{className:"exp-date",children:a.year})]}),c.jsxs("div",{className:"exp-loc-line",children:[a.institution," — ",a.location]}),c.jsxs("div",{className:"edu-note",children:[a.thesis," (",a.honors,")"]})]},l))})]}),c.jsxs("section",{className:"cv-sec",children:[c.jsx("h3",{className:"cv-sec-title",children:"SELECTED ARCHITECTURAL WORKS"}),c.jsx("div",{className:"cv-projects-grid",children:Ss.map(a=>c.jsxs("div",{className:"cv-proj-row",children:[c.jsxs("span",{className:"p-num",children:["PROJ ",a.num]}),c.jsxs("div",{className:"p-details",children:[c.jsxs("span",{className:"p-name",children:[a.name," (",a.year,")"]}),c.jsxs("span",{className:"p-type",children:[a.type," — ",a.location]})]})]},a.id))})]}),c.jsxs("section",{className:"cv-sec",children:[c.jsx("h3",{className:"cv-sec-title",children:"TECHNICAL EXPERTISE & TOOLS"}),c.jsx("div",{className:"cv-skills-grid",children:hm.map((a,l)=>c.jsxs("div",{className:"cv-skill-cat",children:[c.jsxs("span",{className:"cat-hdr",children:[a.category,":"]}),c.jsx("span",{className:"cat-items",children:a.skills.map(n=>n.name).join(", ")})]},l))})]}),c.jsxs("section",{className:"cv-sec",children:[c.jsx("h3",{className:"cv-sec-title",children:"RECOGNITION & AWARDS"}),c.jsx("div",{className:"cv-awards-list",children:vm.map((a,l)=>c.jsxs("div",{className:"cv-award-item",children:[c.jsx("span",{className:"a-year",children:a.year})," — ",c.jsx("span",{className:"a-title",children:a.title})," (",a.organization,")"]},l))})]}),c.jsx("footer",{className:"cv-doc-footer",children:c.jsxs("p",{className:"cv-legal",children:['"',V.disclaimer,'"']})})]})]}),c.jsx("style",{children:`
        .cv-modal-card {
          width: 100%;
          max-width: 900px;
          max-height: 92vh;
          background-color: #ffffff;
          border: 1px solid var(--border-dark);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .cv-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 28px;
          background-color: var(--bg-warm);
          border-bottom: 1px solid var(--border-medium);
        }

        .cv-top-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .print-action-btn {
          padding: 10px 20px;
          font-size: 0.75rem;
        }

        .cv-document-body {
          overflow-y: auto;
          padding: 50px 60px;
          background-color: #ffffff;
          color: #1a1a1a;
          font-family: 'Plus Jakarta Sans', sans-serif;
          line-height: 1.5;
        }

        .cv-doc-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .cv-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.4rem;
          font-weight: 800;
          color: #141414;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }

        .cv-title-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: #1B3629;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .cv-tagline-text {
          font-size: 0.95rem;
          font-style: italic;
          color: #555555;
        }

        .header-contact-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: #444444;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cv-divider {
          border: none;
          border-top: 2px solid #141414;
          margin: 20px 0 28px;
        }

        .cv-sec {
          margin-bottom: 28px;
        }

        .cv-sec-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem;
          font-weight: 700;
          color: #1B3629;
          letter-spacing: 0.1em;
          border-bottom: 1px solid #d0cec5;
          padding-bottom: 6px;
          margin-bottom: 14px;
        }

        .cv-summary-text {
          font-size: 0.92rem;
          color: #333333;
          line-height: 1.6;
        }

        .cv-items-stack {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .exp-line-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.98rem;
        }

        .exp-role-title {
          font-weight: 700;
          color: #141414;
        }

        .exp-co {
          color: #1B3629;
          font-weight: 600;
        }

        .exp-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #666666;
        }

        .exp-loc-line {
          font-size: 0.82rem;
          color: #666666;
          margin-bottom: 8px;
        }

        .exp-bullets {
          padding-left: 20px;
          font-size: 0.86rem;
          color: #444444;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .edu-note {
          font-size: 0.85rem;
          font-style: italic;
          color: #555555;
        }

        .cv-projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .cv-proj-row {
          display: flex;
          gap: 12px;
          font-size: 0.85rem;
          background-color: #faf9f5;
          padding: 8px 12px;
          border: 1px solid #eae8e3;
        }

        .p-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          color: #1B3629;
          font-weight: 700;
        }

        .p-details {
          display: flex;
          flex-direction: column;
        }

        .p-name {
          font-weight: 700;
          color: #141414;
        }

        .p-type {
          font-size: 0.75rem;
          color: #666666;
        }

        .cv-skills-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.85rem;
        }

        .cat-hdr {
          font-weight: 700;
          color: #141414;
          margin-right: 8px;
        }

        .cat-items {
          color: #444444;
        }

        .cv-awards-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.86rem;
        }

        .a-year {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          color: #1B3629;
        }

        .a-title {
          font-weight: 600;
          color: #141414;
        }

        .cv-doc-footer {
          margin-top: 36px;
          padding-top: 16px;
          border-top: 1px dashed #cccccc;
          text-align: center;
        }

        .cv-legal {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: #777777;
        }

        @media (max-width: 768px) {
          .cv-modal-card {
            max-height: 95vh;
          }
          .cv-top-bar {
            padding: 12px 14px;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .cv-top-actions {
            justify-content: space-between;
            width: 100%;
          }
          .cv-document-body {
            padding: 24px 16px;
          }
          .cv-doc-header {
            flex-direction: column;
            gap: 16px;
          }
          .cv-name {
            font-size: 1.8rem;
          }
          .cv-projects-grid {
            grid-template-columns: 1fr;
          }
          .exp-line-header {
            flex-direction: column;
            gap: 2px;
          }
        }

        /* PRINT STYLES */
        @media print {
          .no-print, .no-print-backdrop {
            background: none !important;
            padding: 0 !important;
          }
          .cv-modal-card {
            max-width: 100% !important;
            max-height: none !important;
            box-shadow: none !important;
            border: none !important;
          }
          .cv-document-body {
            padding: 0 !important;
            overflow: visible !important;
          }
        }
      `})]})}function Bg(){const[e,t]=J.useState(!1);return J.useEffect(()=>{const a=setTimeout(()=>{t(!0)},100);return()=>clearTimeout(a)},[]),c.jsxs("div",{className:`grid-drawing-layer ${e?"grid-active":""}`,children:[c.jsx("div",{className:"grid-line vertical line-v-1"}),c.jsx("div",{className:"grid-line vertical line-v-2"}),c.jsx("div",{className:"grid-line vertical line-v-3"}),c.jsx("div",{className:"grid-line horizontal line-h-1"}),c.jsx("div",{className:"grid-line horizontal line-h-2"}),c.jsx("style",{children:`
        .grid-drawing-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .grid-drawing-layer.grid-active {
          opacity: 1;
        }

        .grid-line {
          position: absolute;
          background-color: rgba(20, 20, 20, 0.035);
          transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .grid-line.vertical {
          width: 1px;
          top: 0;
          bottom: 0;
          transform: scaleY(0);
        }

        .grid-line.horizontal {
          height: 1px;
          left: 0;
          right: 0;
          transform: scaleX(0);
        }

        .grid-active .line-v-1 {
          left: 10%;
          transform: scaleY(1);
          transition-delay: 0.1s;
        }

        .grid-active .line-v-2 {
          left: 50%;
          transform: scaleY(1);
          transition-delay: 0.3s;
        }

        .grid-active .line-v-3 {
          left: 90%;
          transform: scaleY(1);
          transition-delay: 0.5s;
        }

        .grid-active .line-h-1 {
          top: 25%;
          transform: scaleX(1);
          transition-delay: 0.2s;
        }

        .grid-active .line-h-2 {
          top: 75%;
          transform: scaleX(1);
          transition-delay: 0.4s;
        }
      `})]})}function kg(){const[e,t]=J.useState(null),[a,l]=J.useState(!1),n=()=>{const i=document.getElementById("projects");if(i){const u=document.body.getBoundingClientRect().top,g=i.getBoundingClientRect().top-u-80;window.scrollTo({top:g,behavior:"smooth"})}};return c.jsxs("div",{className:"app-root",children:[c.jsx(Bg,{}),c.jsx(zg,{onOpenCV:()=>l(!0)}),c.jsxs("main",{className:"main-content",children:[c.jsx(Eg,{onOpenCV:()=>l(!0),onExploreProjects:n}),c.jsx(Ag,{}),c.jsx(Tg,{onSelectProject:i=>t(i)}),c.jsx(Og,{}),c.jsx(Cg,{}),c.jsx(Dg,{}),c.jsx(_g,{}),c.jsx(Rg,{}),c.jsx(Ug,{})]}),c.jsx(Hg,{}),e&&c.jsx(Mg,{project:e,onClose:()=>t(null)}),a&&c.jsx(wg,{onClose:()=>l(!1)})]})}h0.createRoot(document.getElementById("root")).render(c.jsx(J.StrictMode,{children:c.jsx(kg,{})}));
