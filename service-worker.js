futures-calc-v3// Simple PWA cache for offline usage // Scope: files served from your GitHub Pages site const CACHE = 'futures-calc-v1'; const ASSETS = [ './', './index.html' // You can add './manifest.json' and icons here too, but they are tiny and fetched once ];

self.addEventListener('install', event => { event.waitUntil( caches.open(CACHE) .then(cache => cache.addAll(ASSETS)) .then(() => self.skipWaiting()) ); });

self.addEventListener('activate', event => { event.waitUntil( caches.keys().then(keys => Promise.all(keys .filter(k => k !== CACHE) .map(k => caches.delete(k)))) ); self.clients.claim(); });

self.addEventListener('fetch', event => { const req = event.request; const url = new URL(req.url);

// Only handle GET requests from same origin; let others pass through if (req.method !== 'GET' || url.origin !== location.origin) { return; // default network }

event.respondWith( caches.match(req).then(cached => { const fetchPromise = fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; }).catch(() => cached); return cached || fetchPromise; }) ); });

