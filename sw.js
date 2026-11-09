/*! © 2026 Patrick Paul Odiamar Celso (PPC). All rights reserved. */
var C="dige-fn-schedule-3.65.86",F=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(u){return fetch(new Request(u,{cache:"reload"})).then(function(r){if(!r.ok)throw 0;return c.put(u,r)})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("message",function(e){if(e.data==="skip")self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;var u=new URL(e.request.url);if(u.origin!==location.origin)return;
if(e.request.mode==="navigate"){e.respondWith(fetch(new Request(e.request,{cache:"no-cache"})).then(function(r){if(r&&r.ok){var k=r.clone();caches.open(C).then(function(c){c.put("./index.html",k)})}return r}).catch(function(){return caches.match("./index.html",{ignoreSearch:true})}));return}
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||fetch(e.request)}))});
