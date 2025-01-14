// Pilih semua tombol Delete
document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault(); // Mencegah tombol mengirim form secara langsung

      Swal.fire({
        title: "Apakah Anda Yakin ingin menghapus Project Ini",
        text: "Pilih Yes untuk delete dan Cancel untuk membatalkan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          // Submit form jika dikonfirmasi
          const form = this.closest("form");
          form.submit();
        }
      });
    });
  });
});
