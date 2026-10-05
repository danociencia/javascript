let suma = 0;
let cantidad = 0;
let numero = Number(prompt("Introduce un número:"));

while (numero >= 0) {
  suma = suma + numero;
  cantidad++;

  numero = Number(prompt("Introduce otro número:"));
}

const media = suma / cantidad;

alert("Suma: " + suma + "\nMedia: " + media);
