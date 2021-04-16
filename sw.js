const cacheNAme = 'veille-techno-2.0'

self.addEventListener('install', (evt) => {
    console.log(`sw installé à ${new Date().toLocaleTimeString()}`);
    caches.open(cacheNAme).then(cache => {
        cache.addAll([
            'index.html',
            'style.css',
            'vendors/bootsrap4.min.css',
            'add_techno.html',
            'add_techno.js',
            'contact.html',
            'contact.js',
        ])
    })
});

self.addEventListener('activate', (evt) => {
    console.log(`sw activé à ${new Date().toLocaleTimeString()}`);    
});

// network first strategy
self.addEventListener('fetch', evt => {
    evt.respondWith(
        fetch(evt.request).then( res => {
            // we add the latest version into the cache
            caches.open(cacheName).then(cache => cache.put(evt.request, res));
            // we clone it as a response can be read only once (it's like a one time read stream)
            return res.clone();
        })
        .catch(err => caches.match(evt.request))
    );
});

