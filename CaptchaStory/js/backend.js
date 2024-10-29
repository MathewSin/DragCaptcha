// Inisialisasi CAPTCHA dengan gambar rumah
function initializeHouseListeners() {
  const rabbitHouseImage = document.getElementById('rabbitHouse');
  const dogHouseImage = document.getElementById('dogHouse');
  const catHouseImage = document.getElementById('catHouse');

  if (!rabbitHouseImage || !dogHouseImage || !catHouseImage) {
      console.error('House images not found.');
      return;
  }

  // Event listener untuk rumah kelinci (jawaban benar)
  rabbitHouseImage.addEventListener('click', function() {
      Swal.fire({
          title: "Nice Job!",
          text: "Rumah kelinci umumnya berada di bawah tanah!",
          imageUrl: "../style/rumahKelinci.png",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          confirmButtonText: 'OK'
      }).then((result) => {
          if (result.isConfirmed) {
              window.location.href = '../html/home.html'; // Pindah ke halaman berikutnya
          }
      });
  });

  // Event listener untuk rumah anjing (jawaban salah)
  dogHouseImage.addEventListener('click', function() {
      Swal.fire({
          title: "Jawaban Masih belum tepat!",
          text: "Ini rumah anjing!",
          imageUrl: "../style/dogHouse.png",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
          confirmButtonText: 'OK'
      });
  });

  // Event listener untuk rumah kucing (jawaban salah)
  catHouseImage.addEventListener('click', function() {
      Swal.fire({
          title: "Jawaban Masih belum tepat!",
          text: "Ini rumah kucing!",
          imageUrl: "../style/catHouse.png",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          confirmButtonText: 'OK'
      });
  });
}

// Panggil fungsi inisialisasi setelah halaman sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {
  initializeHouseListeners();
});
