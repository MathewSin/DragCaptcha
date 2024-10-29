const fishImage = document.getElementById('fish');
const birdImage = document.getElementById('bird');
const turtleImage = document.getElementById('turtle');
const responseMessage = document.getElementById('response-message'); // Pastikan ini dideklarasikan di awal

turtleImage.addEventListener('click', function() {
  Swal.fire({
      title: "Good Job!",
      text: "Turtle bisa berlari bersama kelinci, meskipun lambat!",
      imageUrl: "../style/turtle.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Turtle image",
      confirmButtonText: 'OK'
  }).then((result) => {
      if (result.isConfirmed) {
          completeCaptcha();
      }
  });
});

// Event listener for fish (incorrect answer)
fishImage.addEventListener('click', function() {
  Swal.fire({
      title: "Oops, Salah!",
      text: "Ikan tidak bisa berlari di darat!",
      imageUrl: "../style/Fish.png",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Fish image",
      confirmButtonText: 'OK'
  }).then(() => reloadCaptcha());
});

// Event listener for bird (incorrect answer)
birdImage.addEventListener('click', function() {
  Swal.fire({
      title: "Oops, Salah!",
      text: "Burung lebih suka terbang daripada berlari!",
      imageUrl: "../style/bird.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Bird image",
      confirmButtonText: 'OK'
  }).then(() => reloadCaptcha());
});


