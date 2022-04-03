const cacheName = '1.5.9.6';

self.addEventListener('install', (evt) => {
    console.log(`sw installé à ${new Date().toLocaleTimeString()}`);       
    const cachePromise = caches.open(cacheName).then(cache => {
        return cache.addAll([
            'index.html',
            'images/splashscreens/iphone5_splash.png',
            'images/splashscreens/iphone6_splash.png',
            'images/splashscreens/iphoneplus_splash.png',
            'images/splashscreens/iphonex_splash.png',
            'images/splashscreens/iphonexr_splash.png',
            'images/splashscreens/iphonexsmax_splash.png',
            'images/splashscreens/ipad_splash.png',
            'images/splashscreens/ipadpro1_splash.png',
            'images/splashscreens/ipadpro3_splash.png',
            'images/splashscreens/ipadpro2_splash.png',
            'fonctionnement.html',
            'bloc.html',
            'bloc/bloc.csv',
            'bloc/bloc.js',
            'style.css',
            'vendors/bootstrap4.min.css',
            'GEU.html',
            'ccam.html',
            'IGH.html',
            'umj.html',
            'HSO.html',
            'vendors/d3.V3.min.js',
            'cours.html',
            'embolisation.html',
            'FCS.html',
            'vomissement.html',
            'accueil.html',
            'gardes.html',
            'garde/garde.csv',
            'garde/garde.js',
            'num.html',
            'images/Logo.png',
            'images/Logo2.png',
            'images/Logo3.png',
            'images/IGH1.png',
            'images/IGH2.png',
            'images/IGH3.png',
            'images/VG2.png',
            'main.js',
            'orthogenie.html',
            'accueil_PMA.html',
            'planning_PMA.html',
            'checklist_PO.html',
            'covid.html',
            'num_PMA.html',
            'protocolegcg.html',
        ])
        .then(console.log('cache initialisé'))
        .catch(console.err);
    });

    evt.waitUntil(cachePromise);
    
});

self.addEventListener('activate', (evt) => {
    console.log(`sw activé à ${new Date().toLocaleTimeString()}`);    
    let cacheCleanedPromise = caches.keys().then(keys => {
		keys.forEach(key => {
			if(key !== cacheName) {
                return caches.delete(key);
            }
		});
	});
	evt.waitUntil(cacheCleanedPromise);
});

// self.addEventListener('fetch', (evt) => {
//     if(!navigator.onLine) {
//         const headers = { headers: { 'Content-Type': 'text/html;charset=utf-8'} };
//         evt.respondWith(new Response('<h1>Pas de connexion internet</h1><div>Apllication en mode dégradé. Veuillez vous connecter</div>', headers));
//     }

//     // always serving css from the cache
//     if(evt.request.url.includes('css')) {
//         caches.open(cacheName).then(cache => {
//             console.log('servi depuis le cache', evt.request.url);
//             cache.match(evt.request);
//         })
//     } else {
//         console.log('fetch request passée à internet', evt.request.url);
//         evt.respondWith(fetch(evt.request));
//     } 
// });


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

