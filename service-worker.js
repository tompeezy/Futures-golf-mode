// minimal SW for GitHub Pages
self.addEventListener('install', function (event) {
  self.skipWaiting();
});
self.addEventListener('activate', function (event) {
  self.clients.claim();
});
// pass-through fetch (no caching yet)
self.addEventListener('fetch', function (event) {});
