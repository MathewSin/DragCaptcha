const carrotImage = document.getElementById('carrot');
const appleImage = document.getElementById('apple');
const bananaImage = document.getElementById('banana');
const responseMessage = document.getElementById('response-message'); // Pastikan ini dideklarasikan di awal

carrotImage.addEventListener('click', function() {
    Swal.fire({
      title: "Nice Job!",
      text: "Tahukan kamu, Wortel itu baik untuk Mata!",
      imageUrl: "../style/Wortel.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        // Pindah ke halaman berikutnya setelah tombol OK ditekan
        window.location.href = '../html/home.html'; // Ganti dengan halaman berikutnya
      }
    });
});

appleImage.addEventListener('click', function() {
  Swal.fire({
    title: "Jawaban Masih belum tepat!",
    text: "Ini buah apel, sehat untuk pencernaan!",
    imageUrl: "../style/apple2.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image",
    confirmButtonText: 'OK'
  })
});

bananaImage.addEventListener('click', function() {
  Swal.fire({
    title: "Jawaban Masih belum tepat!",
    text: "Ini buah pisang, buah ini dapat membantu menjaga kekebalan tubuh!",
    imageUrl: "../style/banana2.png",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
    confirmButtonText: 'OK'
  })
});


