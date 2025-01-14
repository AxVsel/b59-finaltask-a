document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const submitButton = document.querySelector(".button-login-submit");

  submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Mencegah form terkirim langsung

    Swal.fire({
      title: "Apakah Anda Yakin ingin Mengedit Project Ini",
      text: "Pilih Yes untuk menyimpan perubahan dan Cancel untuk membatalkan perubahan",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Submit form jika dikonfirmasi
        Swal.fire("Saved!", "Your changes have been saved.", "success").then(
          () => {
            form.submit(); // Kirim form
          }
        );
      }
    });
  });
});
