// version 1.0.0 18-04-21-1940

const cacheNAme = 'veille-techno-2.0'

self.addEventListener('install', (evt) => {
    console.log(`sw installé à ${new Date().toLocaleTimeString()}`);
    self.skipWaiting();
    const cachePromise = caches.open(cacheNAme).then(cache => {
        return cache.addAll([
            'index.html',
            'style.css',
            'vendors/bootsrap4.min.css',
            'add_techno.html',
            'add_techno.js',
            'contact.html',
            'contact.js',
        ])
    });
    evt.waitUntil(cachePromise);
});

self.addEventListener('activate', (evt) => {
    console.log(`sw activé à ${new Date().toLocaleTimeString()}`);    
});

// network first strategy
self.addEventListener('fetch', evt => {
    evt.respondWith(
        fetch(evt.request).then( res => {
            console.log(`${evt.request.url} fétché depuis depuis le reseau`);
            // we add the latest version into the cache
            caches.open(cacheName).then(cache => cache.put(evt.request, res));
            // we clone it as a response can be read only once (it's like a one time read stream)
            return res.clone();
        })
        .catch(err => {
            console.log(`${evt.request.url} fétché depuis depuis le cache`);
            caches.match(evt.request);
        })
    );
});

