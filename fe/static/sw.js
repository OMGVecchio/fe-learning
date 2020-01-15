importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/6dd7aa19eb32822fece9.js",
    "revision": "022d758d38eb96164247907ab8a0e760"
  },
  {
    "url": "/_nuxt/7ff2977b1640c71ada6d.js",
    "revision": "211be9ca3e7a4c64398e74d28806746f"
  },
  {
    "url": "/_nuxt/8891079709c23ae1b0bc.js",
    "revision": "ab503cbe674b8b556c614560f0c2f3ee"
  },
  {
    "url": "/_nuxt/89d68ff8f8817a11141b.js",
    "revision": "8165ea73d89d72f2ed1f11c990836870"
  },
  {
    "url": "/_nuxt/aa3575f631f4cea967e9.js",
    "revision": "f455b621cfb17d679e64d605fbf38e5d"
  },
  {
    "url": "/_nuxt/e999b6cbecf010ec816b.js",
    "revision": "a49f8229ebb7251d37c54d1224534924"
  }
], {
  "cacheId": "learning",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
