const urlPokemon = "https://pokeapi.co/api/v2/pokemon?limit=5";
const urlDetalles = "https://pokeapi.co/api/v2/pokemon/palkia";

const promesaRespuesta = fetch(urlPokemon);
console.log(promesaRespuesta);

fetch(urlPokemon)
    .then(respuesta => {
        console.log("Respuesta recibida:", respuesta);
        return respuesta.json();
    })
    .then(datos => {
        console.log("Objeto completo:", datos);
        console.log("Tipo de dato:", typeof datos);
        console.log("Resultados:", datos.results);

    const lista = datos.results
        .map(pokemon => `<li>${pokemon.name}</li>`)
        .join("");

    document.body.innerHTML = `
        <h1>Listado de Pokémon</h1>
        <ul>${lista}</ul>
    `;
});