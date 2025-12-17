const CACHE_NAME = "neon-xo-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",

  // sounds
  "./sounds/click.mp3",
  "./sounds/turnO.mp3",
  "./sounds/turnX.mp3",
  "./sounds/win.mp3",
  "./sounds/draw.mp3",
  "./sounds/count.mp3",

  // icons
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
