// Nama cache yang akan digunakan
const CACHE_NAME = 'portofolio-chace-v1';

// Daftar file yang akan disimpan di cache
const FILES_TO_CACHE = [
  'index.html',
  'style.css',
  'app.js',
  'profileku2.jpg'
];

// Event ini akan dijalankan saat Service Worker pertama kali diinstal
self.addEventListener("install", event => {
  // Tunggu hingga semua file di FILES_TO_CACHE selesai dicache
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE); // Menambahkan semua file ke cache
    })
  );
  console.log("✅ Service Worker: Installed & Files Cached");
});


// Event ini akan menangani semua permintaan resource (seperti file HTML, CSS, gambar, dll.)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request) // Cek apakah file ada di cache
      .then(response => {
        return response || fetch(event.request); // Jika ada di cache, pakai itu. Jika tidak, ambil dari jaringan.
      })
  );
});


// Event ini dijalankan saat Service Worker baru diaktifkan
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          // Jika ada cache lama (dengan nama berbeda dari CACHE_NAME), hapus
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  console.log("♻️ Service Worker: Activated & Old Cache Deleted");
});
