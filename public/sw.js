
const CACHE_NAME = 'pebbleway-v1';
const urlsToCache = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  '/src/pages/Index.tsx',
  '/src/components/AuthScreen.tsx',
  '/src/components/Dashboard.tsx',
  '/src/components/Navigation.tsx',
  '/src/components/Journal.tsx',
  '/src/components/Library.tsx',
  '/src/components/Settings.tsx',
  '/src/components/CalendarView.tsx',
  '/src/components/GoalModal.tsx'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
