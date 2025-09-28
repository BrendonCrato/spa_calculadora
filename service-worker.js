const CACHE_NAME = "rpe-cache-v1";
const URLS_TO_CACHE = [
  "/spa_calculadora/",
  "/spa_calculadora/index.html",
  "/spa_calculadora/manifest.json",
  "/spa_calculadora/icons/icon-192.png",
  "/spa_calculadora/icons/icon-512.png"
];

// Instala e adiciona os arquivos ao cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Ativa e limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Busca do cache primeiro, depois rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
