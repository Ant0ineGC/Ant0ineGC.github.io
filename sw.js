const cacheNAme = 'veille-techno-1.0'

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

self.addEventListener('fetch', (evt) => {
    if(!navigator.onLine) {
        const headers = { headers: { 'Content-Type': 'text/html;charset=utf-8'} };
        evt.respondWith(new Response('<h1>Pas de connexion internet</h1><div>Apllication en mode dégradé. Veuillez vous connecter</div>', headers));
    }
    
    console.log('sw intercepte la requête suivante via fetch', evt);
    console.log('url interceptée', evt.request.url);

    evt.respondWith(
        caches.match(evt.request).then (res => {
            if (res) {
                return (res);
            }
            return fetch (evt.request).then(newResponse => {
                caches.open (cacheNAme).then (cache => cache.put (evt.request, newResponse));
                return newResponse.clone();
            })
        })
    );
});

