/*! © 2026 Patrick Paul Odiamar Celso (PPC). All rights reserved. FP DGFN-PPC-15B25FC1-BDDD0E24 */
var C="dige-fn-3.61.59",F=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}))});
self.addEventListener("message",function(e){if(e.data==="skip")self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;var u=new URL(e.request.url);if(u.origin!==location.origin)return;
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||fetch(e.request)}))});
