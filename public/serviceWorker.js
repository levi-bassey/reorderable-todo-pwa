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
  "dist/App.svelte.js",
  "dist/todoStore.js",
  "dist/components/Checkbox.svelte.js",
  "dist/components/Header.svelte.js",
  "dist/components/TodoItem.svelte.js",
  "dist/components/TodoList.svelte.js",
  "dist/_snowpack/pkg/idb.js",
  "dist/_snowpack/pkg/nanoid.js",
  "dist/_snowpack/pkg/import-map.json",
  "dist/_snowpack/pkg/svelte/animate.js",
  "dist/_snowpack/pkg/svelte/easing.js",
  "dist/_snowpack/pkg/svelte/internal.js",
  "dist/_snowpack/pkg/svelte/store.js",
  "dist/_snowpack/pkg/svelte/transition.js",
  "dist/_snowpack/pkg/common/index-724add65.js",
  "dist/_snowpack/pkg/common/index-42821ab5.js",
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
