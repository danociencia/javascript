function celsiusAFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function fahrenheitACelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function kilometrosAMillas(kilometros) {
    return kilometros * 0.621371;
}

function millasAKilometros(millas) {
    return millas / 0.621371;
}

function eurosADolares(euros, cambio = 1.01) {
    return euros / cambio;
}

function dolaresAEuros(dolares, cambio = 1.01) {
    return dolares * cambio;
}

function mostrarResultado(valor, unidadOrigen, unidadDestino, funcionConversion) {
    const resultado = funcionConversion(valor);

    console.log(
        valor + " " + unidadOrigen +
        " equivalen a " +
        resultado.toFixed(2) + " " + unidadDestino
    );
}

let opcion;

do {
    opcion = prompt(
        "MENÚ DE CONVERSIÓN\n" +
        "1. Celsius a Fahrenheit\n" +
        "2. Fahrenheit a Celsius\n" +
        "3. Kilómetros a millas\n" +
        "4. Millas a kilómetros\n" +
        "5. Euros a dólares\n" +
        "6. Dólares a euros\n" +
        "7. Salir"
    );

    let valor;

    switch (opcion) {
        case "1":
            valor = Number(prompt("Introduce los grados Celsius:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, "ºC", "ºF", celsiusAFahrenheit);
            } else {
                alert("Debes introducir un número.");
            }

            break;

        case "2":
            valor = Number(prompt("Introduce los grados Fahrenheit:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, "ºF", "ºC", fahrenheitACelsius);
            } else {
                alert("Debes introducir un número.");
            }

            break;

        case "3":
            valor = Number(prompt("Introduce los kilómetros:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, "km", "millas", kilometrosAMillas);
            } else {
                alert("Debes introducir un número.");
            }

            break;

        case "4":
            valor = Number(prompt("Introduce las millas:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, "millas", "km", millasAKilometros);
            } else {
                alert("Debes introducir un número.");
            }

            break;

        case "5":
            valor = Number(prompt("Introduce los euros:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, "€", "$", eurosADolares);
            } else {
                alert("Debes introducir un número.");
            }

            break;

        case "6":
            valor = Number(prompt("Introduce los dólares:"));

            if (Number.isFinite(valor)) {
                mostrarResultado(valor, "$", "€", dolaresAEuros);
            } else {
                alert("Debes introducir un número.");
            }

            break;

        case "7":
            console.log("Programa terminado.");
            break;

        default:
            alert("La opción introducida no es válida.");
    }

} while (opcion !== "7");