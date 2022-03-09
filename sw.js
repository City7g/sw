const staticCacheName = 's-app-v2'
const dynamicCacheName = 'd-app-v2'

const assetUrls = [
  'index.html',
  'main.js',
  'style.css',
  'offline.html'
]

self.addEventListener('install', event => {
  console.log('SW install')
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => cache.addAll(assetUrls))
  )
})

self.addEventListener('installed', () => {
  console.log('SW installed')
})

self.addEventListener('activating', () => {
  console.log('SW activating')
})

// self.addEventListener('activate', async event => {
//   const cacheName = await caches.keys()
//   await Promise.all(
//     cacheName
//       .filter(name => name !== staticCacheName || name !== dynamicCacheName)
//       .map(name => caches.delete(name))
//   )
// })

self.addEventListener('fetch', event => {
  const { request } = event

  const url = new URL(request.url)
  if(url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})

const cacheFirst = async request => {
  const cached = await caches.match(request)
  return cached ?? fetch(request)
}

const networkFirst = async request => {
  const cache = await caches.open(dynamicCacheName)

  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (err) {
    const cached = await cache.match(request)
    console.log(1)
    return cached ?? await caches.match('/offline.html')
  }
  // const cached = await cache.match(request)
  // return cached ?? await caches.match('/offline.html')
}