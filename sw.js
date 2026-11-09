/*! © 2026 Patrick Paul Odiamar Celso (PPC). All rights reserved. FP DGFN-PPC-15B25FC1-BDDD0E24 */
var C="dige-fn-app",F=["./","./index.html","./manifest.webmanifest","./schedule.html","./schedule-manifest.webmanifest","./sched-icon-192.png","./sched-icon-512.png","./sched-icon-maskable-512.png","./sched-apple-touch-icon.png","./icon-192.png","./icon-512.png"];
function clean(r){return r&&r.redirected?r.blob().then(function(b){return new Response(b,{status:r.status,statusText:r.statusText,headers:r.headers})}):Promise.resolve(r)}
/*Updates are chosen by the person: the app files are kept in one cache that only the in-app "Update now" button refreshes (it reads version.json). Installing this worker only fills in files that are missing.*/
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(u){return c.match(u).then(function(h){if(h)return;return fetch(new Request(u,{cache:"reload",headers:{"X-DG-Upd":"1"}})).then(function(r){if(!r.ok)throw 0;return clean(r).then(function(x){return c.put(u,x)})})})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("message",function(e){if(e.data==="skip")self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;var u=new URL(e.request.url);if(u.origin!==location.origin)return;
if(/\/version\.json$/.test(u.pathname))return;if(e.request.headers.get("x-dg-upd"))return;
var nav=e.request.mode==="navigate"||/\/(index\.html|schedule\.html)?$/.test(u.pathname);
var pg=/schedule\.html/.test(u.pathname)?"./schedule.html":"./index.html";
if(nav){e.respondWith(caches.match(pg,{ignoreSearch:true}).then(function(r){return r?clean(r):fetch(e.request).then(function(n){if(n&&n.ok&&!n.redirected){var k=n.clone();caches.open(C).then(function(c){c.put(pg,k)})}return n})}));return}
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r?clean(r):fetch(e.request)}))});
