
console.log('hello depuis main');
const technosDiv = document.querySelector('#technos');

function loadTechnologies(technos) {
    fetch('http://localhost:3001/technos')
        .then(response => {
            response.json()
                .then(technos => {
                    const allTechnos = technos.map(t => `<div><b>${t.name}</b> ${t.description}  <a href="${t.url}">site de ${t.name}</a> </div>`)
                            .join('');
            
                    technosDiv.innerHTML = allTechnos; 
                });
        })
        .catch(console.error);
}

loadTechnologies(technos);

if(navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js')
                            .catch(err => console.error);
}

if(window.caches) {
    caches.open('veille-techno-1.0').then(cache => {
        cache.addAll([
            'index.html',
            'main.js',
            'vendors/bootsrap4.min.css'
        ]);
    });
    
}
