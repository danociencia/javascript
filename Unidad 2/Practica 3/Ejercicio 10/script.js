const numeroSecreto = Math.floor(Math.random() * 10) + 1;

let numero = Number(prompt("Adivina el número entre 1 y 10:"));

while (numero !== numeroSecreto) {
  if (numero < numeroSecreto) {
    alert("El número es mayor");
  } else {
    alert("El número es menor");
  }

  numero = Number(prompt("Inténtalo de nuevo:"));
}

alert("¡Has acertado!");
