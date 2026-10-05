let edad = Number(prompt("Introduce tu edad: "));
let nota = Number(prompt("Introduce tu nota media con tres decimales:"));

console.log(nota.toFixed(2))

console.log(edad + nota)
console.log(edad - nota)
console.log(edad * nota)
console.log(edad / nota)

console.log(String(edad / nota));

let aprobado = true;

console.log(typeof edad);
console.log(typeof nota);
console.log(typeof aprobado);

console.log(!isNaN(edad) && !isNaN(nota));
console.log(nota >= 0 && nota <= 10 && nota !== 0);

