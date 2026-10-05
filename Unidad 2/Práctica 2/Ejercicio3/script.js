let nombre = "Daniel";
let apellidos = "Torres";

console.log(nombre.concat(" ", apellidos, ".").length);

console.log(nombre.concat(" ", apellidos, ".").slice(7, 11));

apellidos = apellidos.replace("Torres", "García");

console.log(nombre.concat(" ", apellidos, ".").toUpperCase());

console.log(nombre.concat(" ", apellidos, ".").slice(-1));

let array = nombre.concat(" ", apellidos, ".").split(" ");
console.log(array);


console.log(nombre.concat(" ", apellidos, ".").indexOf(apellidos));

console.log(`Bienvenido/a ${nombre.concat(" ", apellidos, ".")}`);

console.log(array[0][0].toUpperCase() + array[1][0].toUpperCase());
