const staticDevCoffee = 'dev-eppo-v7';
const assets = [
    '/',
    '/index.html',
    '/assets/styles/style.css',
    '/scripts/app.js',
    '/scripts/actions.js',
    '/scripts/geo.js',
    '/assets/images/alert.svg',
    '/data/cities.json',
    '/assets/images/arrow.svg',
    '/assets/images/compass.png',
    '/assets/images/drone.svg',
    '/assets/images/explosion.svg',
    '/assets/images/hammer.svg',
    '/assets/images/helicopter.svg',
    '/assets/images/plane.svg',
    '/assets/images/rocket.svg',
];

self.addEventListener('install', (installEvent) => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then((cache) => {
            cache.addAll(assets);
        }),
    );
});

self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then((res) => {
            return res || fetch(fetchEvent.request);
        }),
    );
});
