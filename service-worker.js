const CACHE_NAME = "todo-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/script.js",
    "/manifest.json",
    "/icon 192.PNG.jpg",
    "/icon 512.PNG.jpg",
];

// Install service worker and cache files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Serve from cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});