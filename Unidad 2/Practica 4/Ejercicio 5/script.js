function notaValida(entrada) {
    const nota = Number(entrada);

    return entrada !== "" &&
        Number.isFinite(nota) &&
        nota >= 0 &&
        nota <= 10;
}

function clasificarNota(nota) {
    if (nota < 5) return "Suspenso";
    if (nota < 7) return "Aprobado";
    if (nota < 9) return "Notable";

    return "Sobresaliente";
}

function calcularMedia(notas) {
    let suma = 0;

    for (const nota of notas) {
        suma += nota;
    }

    return suma / notas.length;
}

const notas = [];

while (true) {
    const entrada = prompt("Introduce una nota del 0 al 10 (-1 para terminar):");

    if (entrada === "-1") break;

    if (!notaValida(entrada)) {
        alert("La nota no es válida.");
        continue;
    }

    const nota = Number(entrada);

    notas.push(nota);
    console.log(nota + " - " + clasificarNota(nota));
}

if (notas.length === 0) {
    console.log("No se ha introducido ninguna nota.");
} else {
    const media = calcularMedia(notas);

    console.log("Notas: " + notas.length);
    console.log("Media: " + media.toFixed(2));
    console.log("Máxima: " + Math.max(...notas));
    console.log("Mínima: " + Math.min(...notas));
}