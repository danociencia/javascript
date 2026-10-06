function generarNumero() {
    return Math.floor(Math.random() * 100) + 1;
}

function intentosPorNivel(nivel) {
    switch (nivel) {
        case "1": return 10;
        case "2": return 7;
        case "3": return 5;
        default: return 0;
    }
}

function intentoValido(valor) {
    return valor !== "" &&
        Number.isFinite(Number(valor)) &&
        Number(valor) >= 1 &&
        Number(valor) <= 100;
}

function comparar(numero, secreto) {
    if (numero === secreto) return "acierto";
    if (numero < secreto) return "mayor";
    return "menor";
}

function jugarRonda(nivel = "2") {

    const secreto = generarNumero();
    const limite = intentosPorNivel(nivel);

    let puntos = 0;

    for (let intento = 1; intento <= limite; intento++) {

        let entrada = prompt(
            "Intento " + intento + " de " + limite +
            "\nIntroduce un número del 1 al 100:"
        );

        while (!intentoValido(entrada)) {
            alert("Introduce un número válido entre 1 y 100.");
            entrada = prompt("Introduce un número:");
        }

        const resultado = comparar(Number(entrada), secreto);

        if (resultado === "acierto") {
            alert("¡Has acertado!");
            puntos += 10;
            return puntos;
        }

        puntos--;

        if (resultado === "mayor") {
            alert("Prueba con un número mayor.");
        } else {
            alert("Prueba con un número menor.");
        }
    }

    alert("Has perdido. El número era " + secreto);
    return puntos;
}


let puntuacion = 0;
let opcion;

do {

    opcion = prompt(
        "1. Fácil\n" +
        "2. Normal\n" +
        "3. Difícil\n" +
        "4. Salir\n\n" +
        "Puntuación: " + puntuacion
    );

    switch (opcion) {

        case "1":
        case "2":
        case "3":
            const puntosRonda = jugarRonda(opcion);
            puntuacion += puntosRonda;

            alert("Puntuación acumulada: " + puntuacion);
            break;

        case "4":
            alert("Has salido del juego.");
            break;

        default:
            alert("Opción no válida.");
    }

} while (opcion !== "4");