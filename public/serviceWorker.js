const staticCacheName = "statics";
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
];

//This event is triggered once this file executes
self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => cache.addAll(assets).catch(console.log))
  );
});

self.addEventListener("activate", event => {
  console.log("service worker is activating");
});

self.addEventListener("fetch", event => {});
