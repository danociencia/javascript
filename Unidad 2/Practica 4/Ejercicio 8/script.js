function analizar(...numeros) {

    if (numeros.length === 0) {
        return null;
    }

    for (const numero of numeros) {
        if (!Number.isFinite(numero)) {
            return null;
        }
    }

    let suma = 0;
    let minimo = numeros[0];
    let maximo = numeros[0];

    for (const numero of numeros) {

        suma += numero;

        if (numero < minimo) {
            minimo = numero;
        }

        if (numero > maximo) {
            maximo = numero;
        }
    }

    const media = suma / numeros.length;

    return {
        suma: suma,
        media: media,
        minimo: minimo,
        maximo: maximo
    };
}


function mostrarInforme(informe) {

    if (informe === null) {
        console.log("No se puede generar el informe.");
        return;
    }

    console.log("Suma: " + informe.suma);
    console.log("Media: " + informe.media.toFixed(2));
    console.log("Mínimo: " + informe.minimo);
    console.log("Máximo: " + informe.maximo);
}