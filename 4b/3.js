function recursiveBubbleSort(arr, n) {
  if (n === 1) return arr;

  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
  }

  return recursiveBubbleSort(arr, n - 1);
}

function sortArray(arr) {
  const sortedArray = recursiveBubbleSort([...arr], arr.length);
  const ganjil = sortedArray.filter((num) => num % 2 !== 0);
  const genap = sortedArray.filter((num) => num % 2 === 0);

  return {
    array: sortedArray,
    ganjil: ganjil,
    genap: genap,
  };
}

// Contoh penggunaan:
const hasil = sortArray([2, 24, 32, 22, 31]);
console.log("Array: " + hasil.array);
console.log("Ganjil: " + hasil.ganjil);
console.log("Genap: " + hasil.genap);
