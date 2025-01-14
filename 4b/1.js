function drawSikuSiku(baris) {
  const bilanganPrima = (angka) => {
    if (angka < 2) return false;
    for (let i = 2; i <= Math.sqrt(angka); i++) {
      if (angka % i === 0) return false;
    }
    return true;
  };

  let angka = 2;
  for (let i = 1; i <= baris; i++) {
    let baris = [];
    while (baris.length < i) {
      if (bilanganPrima(angka)) baris.push(angka);
      angka++;
    }
    console.log(baris.join(" "));
  }
}

drawSikuSiku(7); // input angka
