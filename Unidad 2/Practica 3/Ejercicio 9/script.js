const contraseña = "1234";
let respuesta = prompt("Introduce la contraseña:");

while (respuesta !== contraseña) {
  respuesta = prompt("Contraseña incorrecta. Inténtalo de nuevo:");
}

alert("Contraseña correcta");