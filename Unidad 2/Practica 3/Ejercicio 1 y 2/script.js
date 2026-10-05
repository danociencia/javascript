const numero1 = Number(prompt("Introduce el primer número:"));
const numero2 = Number(prompt("Introduce el segundo número:"));

if (isNaN(numero1) || isNaN(numero2) || numero1 === 0 || numero2 === 0) {
  alert("Error: los valores deben ser números distintos de cero");
} else if (numero1 === numero2) {
  alert("Los dos números son iguales");
} else if (numero1 > numero2) {
  alert("El primer número es mayor que el segundo");
} else {
  alert("El segundo número es mayor que el primero");
}
