const numero = Number(prompt("Introduce un número"));

for (let divisor = 1; divisor <= numero; divisor++) {
  if (numero % divisor === 0) {
    console.log(divisor);
  }
}