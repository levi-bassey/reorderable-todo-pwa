const staticCacheName = "statics-v1";
const dynamicCacheName = "dynamic-v1";
const assets = [
  "/",
  "index.html",
  "index.css",
  "favicon-32x32.png",
  "manifest.json",
  "images/bg-desktop-dark.jpg",
  "images/bg-desktop-light.jpg",
  "images/icon-check.svg",
  "dist/index.js",
  "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap",
  "https://fonts.gstatic.com/s/josefinsans/v17/Qw3aZQNVED7rKGKxtqIqX5EUAnx4RHw.woff2",
  "https://fonts.gstatic.com/s/josefinsans/v17/Qw3aZQNVED7rKGKxtqIqX5EUDXx4.woff2",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => cache.addAll(assets))
      .catch(error => console.log("Failed to install", error))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== staticCacheName && key !== dynamicCacheName)
            .map(key => caches.delete(key))
        )
      )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(
      response =>
        response ??
        fetch(event.request).then(response =>
          caches.open(dynamicCacheName).then(cache => {
            cache.put(response.url, response.clone());
            return response;
          })
        )
    )
  );
});
