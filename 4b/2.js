function hitungVoucher(voucher, uangBelanja) {
  let diskon = 0;
  let bayar = uangBelanja; // asumsikan uang belanja sama dengan harga barang
  let kembalian = 0;

  if (voucher === "DumbWaysJos" && uangBelanja >= 50000) {
    diskon = uangBelanja * 0.2; // 20% potongan
    diskon = Math.min(diskon, 20000); // Maksimal diskon 20000
  } else if (voucher === "DumbWaysMantap" && uangBelanja >= 80000) {
    diskon = uangBelanja * 0.3; // 30% potongan
    diskon = Math.min(diskon, 40000); // Maksimal diskon 40000
  }

  bayar = uangBelanja - diskon;

  kembalian = Math.max(0, uangBelanja - bayar);

  return {
    bayar: bayar,
    diskon: diskon,
    kembalian: kembalian,
  };
}

const hasil = hitungVoucher("DumbWaysJos", 100000); // input
console.log("Uang yang harus dibayar: " + hasil.bayar);
console.log("Diskon: " + hasil.diskon);
console.log("Kembalian: " + hasil.kembalian);
