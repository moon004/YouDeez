console.log('My custom service worker');


const cacheName = 'version-1';


self.addEventListener('install', (e) => {
  console.log('Service worker installed');
});

self.addEventListener('activate', (e) => {
  console.log('SW activated');
  // remove caches
  e.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map((cache) => {
        if (cache !== cacheName) {
          console.log('SW: clearing old cache');
          return caches.delete(cache);
        }
      }),
    )),
  );
});

self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(cacheName)
          .then((cache) => {
            cache.put(e.request, resClone);
          });
        return res;
      }).catch(() => caches.match(e.request).then(res => res)),
  );
});
