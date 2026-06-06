const CACHE_NAME = 'ewi-synth-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './main.js'
];

// インストール時に静的資産をキャッシュ
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// オフライン時はキャッシュから即座に返却（爆速起動の要）
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});