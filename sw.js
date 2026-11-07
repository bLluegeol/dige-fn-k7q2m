/*! © 2026 Patrick Paul Odiamar Celso (PPC). All rights reserved. FP DGFN-PPC-15B25FC1-BDDD0E24 */
var C="dige-fn-3.65.130",F=["./","./index.html","./manifest.webmanifest","./schedule.html","./schedule-manifest.webmanifest","./sched-icon-192.png","./sched-icon-512.png","./sched-icon-maskable-512.png","./sched-apple-touch-icon.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(u){return fetch(new Request(u,{cache:"reload"})).then(function(r){if(!r.ok)throw 0;return c.put(u,r)})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("message",function(e){if(e.data==="skip")self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;var u=new URL(e.request.url);if(u.origin!==location.origin)return;
var nav=e.request.mode==="navigate"||/\/(index\.html|schedule\.html)?$/.test(u.pathname);
var pg=/schedule\.html/.test(u.pathname)?"./schedule.html":"./index.html";
if(nav){e.respondWith(fetch(new Request(e.request,{cache:"no-cache"})).then(function(r){if(r&&r.ok){var k=r.clone();caches.open(C).then(function(c){c.put(pg,k)})}return r}).catch(function(){return caches.match(pg,{ignoreSearch:true})}));return}
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||fetch(e.request)}))});
