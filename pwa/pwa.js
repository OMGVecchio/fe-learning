const cacheStorageKey = 'pwa-demo'
const cacheList = [
	"/",
	"pwa.html",
	"pwa.css",
	"favicon.png"
]

self.addEventListener('install', e => {
	console.info('install')
	e.waitUntil(
		caches.open(cacheStorageKey)
		.then(cache => cache.addAll(cacheList))
		.then(() => self.skipWaiting())
	)
})

self.addEventListener('fetch', function(e) {
	console.info('fetch')
	e.respondWith(
		caches.match(e.request).then(function(response) {
			if (response != null) {
				return response
			}
			return fetch(e.request.url)
		})
	)
})

self.addEventListener('activate', function(e) {
	console.info('activate')
	e.waitUntil(
		Promise.all(
			caches.keys().then(cacheNames => {
				return cacheNames.map(name => {
					if (name !== cacheStorageKey) {
							return caches.delete(name)
					}
				})
			})
		).then(() => {
			return self.clients.claim()
		})
	)
})
