function calcularLitros(distancia, consumo) {
    return distancia * consumo / 100;
}

function calcularCosteTotal(litros, precio = 1.60) {
    return litros * precio;
}

function calcularCostePorViajero(coste, viajeros) {
    return coste / viajeros;
}

function mostrarCoste(texto, funcion) {
    console.log(texto + ": " + funcion().toFixed(2) + " €");
}

let distancia;

do {
    distancia = Number(prompt("Distancia en km:"));

    if (!Number.isFinite(distancia) || distancia <= 0) {
        alert("La distancia debe ser mayor que 0.");
    }

} while (!Number.isFinite(distancia) || distancia <= 0);


let consumo;

do {
    consumo = Number(prompt("Consumo en l/100 km:"));

    if (!Number.isFinite(consumo) || consumo <= 0) {
        alert("El consumo debe ser mayor que 0.");
    }

} while (!Number.isFinite(consumo) || consumo <= 0);


let precio;

do {
    let entrada = prompt("Precio del combustible (vacío = 1.60 €):");

    precio = entrada === "" ? undefined : Number(entrada);

    if (precio !== undefined && (!Number.isFinite(precio) || precio <= 0)) {
        alert("El precio debe ser mayor que 0.");
    }

} while (precio !== undefined && (!Number.isFinite(precio) || precio <= 0));


let viajeros;

do {
    viajeros = Number(prompt("Número de viajeros:"));

    if (!Number.isFinite(viajeros) || viajeros <= 0) {
        alert("Debe haber al menos 1 viajero.");
    }

} while (!Number.isFinite(viajeros) || viajeros <= 0);


const litros = calcularLitros(distancia, consumo);
const coste = calcularCosteTotal(litros, precio);

console.log("Combustible: " + litros.toFixed(2) + " litros");

mostrarCoste("Coste total", () => coste);
mostrarCoste("Coste por viajero", () => calcularCostePorViajero(coste, viajeros));