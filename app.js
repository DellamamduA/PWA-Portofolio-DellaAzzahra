// Cek apakah browser mendukung Service Worker
if ("serviceWorker" in navigator) {

  // Tunggu sampai semua konten halaman selesai dimuat
  window.addEventListener("load", function () {

    // Coba daftar file service-worker.js sebagai Service Worker
    navigator.serviceWorker
      .register("service-worker.js")

      // Jika pendaftaran berhasil
      .then(function (registration) {
        // Tampilkan pesan sukses dan cakupan (scope) dari Service Worker
        console.log("✅ Service Worker berhasil didaftarkan:", registration.scope);
      })

      // Jika pendaftaran gagal
      .catch(function (error) {
        // Tampilkan pesan error di konsol
        console.log("❌ Service Worker gagal didaftarkan:", error);
      });
  });

}
