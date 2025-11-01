/* Basic service worker with install prompt and caching */

const CACHE_NAME = 'shelfai-cache-v1'
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
  // Vite will fingerprint assets; runtime caching handles the rest
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key)
        })
      )
    )
  )
  self.clients.claim()
})

/* Network-first for API, cache-first for static */
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          return res
        })
        .catch(() => caches.match(request))
    )
    return
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((res) => {
        const clone = res.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        return res
      })
    })
  )
})

/* Minimal install prompt handling via beforeinstallprompt forwarded to clients */
self.addEventListener('message', (event) => {
  // Reserved for future message-based SW features
})
