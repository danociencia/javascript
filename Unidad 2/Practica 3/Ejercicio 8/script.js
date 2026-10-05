const palabra = prompt("Introduce una palabra");
let vocales = 0;

for (const letra of palabra) {
  if (
    letra === "a" ||
    letra === "e" ||
    letra === "i" ||
    letra === "o" ||
    letra === "u"
  ) {
    vocales++;
  }
}

console.log("La palabra tiene " + vocales + " vocales");
