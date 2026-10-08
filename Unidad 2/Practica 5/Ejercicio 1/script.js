const lista = ["sol", "montaña", "rio", "bosque", "mariposa", "luz", "montaña"];

function contarPalabras() {

    let contador = 0;

    for (let i = 0; i < lista.length; i++) {
        if (lista[i] === "montaña") {
            contador++;
        }
    }

    console.log("La palabra montaña está: " + contador + " veces");

}

function palabrasLargas() {

    const resultado = [];

    for (let i = 0; i < lista.length; i++) {
        if (lista[i].length > 4) {
            resultado.push(lista[i]);
        }
    }

    return resultado;

}

function primeraPosicion(palabra) {
    return lista.indexOf(palabra)
}

console.log(contarPalabras());
console.log(palabrasLargas());
console.log(primeraPosicion());
