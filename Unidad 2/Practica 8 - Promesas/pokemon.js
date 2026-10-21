
const urlListado = "https://pokeapi.co/api/v2/pokemon?limit=5";
const urlPalkia = "https://pokeapi.co/api/v2/pokemon/palkia";
 
const promesaRespuesta = fetch(urlListado);
console.log(promesaRespuesta);
 
function obtenerDatos(url) {
  return fetch(url).then(respuesta => {
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
 
    return respuesta.json();
  });
}
 
function mostrarPokemon(pokemon) {
  document.body.innerHTML = `
    <h1>Pokémon</h1>
    <article>
      <h2>${pokemon.name}</h2>
      <p>Número: ${pokemon.id}</p>
      <p>Tipo: ${pokemon.types[0].type.name}</p>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    </article>
  `;
}
 
function esperar(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
 
document.body.innerHTML = "<h1>Pokémon</h1><p>Cargando...</p>";
 
fetch(urlListado)
  .then(respuesta => {
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
 
    return respuesta.json();
  })
  .then(datos => {
    console.log("Datos:", datos);
    console.log("Tipo de dato:", typeof datos);
    console.log("Results:", datos.results);
 
    const nombres = datos.results
      .map(pokemon => `<li>${pokemon.name}</li>`)
      .join("");
 
    document.body.innerHTML = `
      <h1>Pokémon</h1>
      <ul>${nombres}</ul>
    `;
 
    const urlPrimero = datos.results[0].url;
    return obtenerDatos(urlPrimero);
  })
  .then(pokemon => {
    mostrarPokemon(pokemon);
  })
  .catch(error => {
    console.error("No se pudo obtener el Pokémon:", error.message);
    document.body.innerHTML = `
      <h1>Pokémon</h1>
      <p>No se pudo cargar el Pokémon: ${error.message}</p>
    `;
  })
  .finally(() => console.log("Petición terminada"));
 
esperar(5000)
  .then(() => {
    console.log("Cargando Palkia...");
    return obtenerDatos(urlPalkia);
  })
  .then(pokemon => {
    console.log("Nombre:", pokemon.name);
    console.log("Número:", pokemon.id);
    console.log("Tipo:", pokemon.types[0].type.name);
    console.log("Imagen:", pokemon.sprites.front_default);
 
    mostrarPokemon(pokemon);
  })
  .catch(error => {
    console.error("No se pudo obtener a Palkia:", error.message);
    document.body.innerHTML = `
      <h1>Pokémon</h1>
      <p>No se pudo cargar a Palkia: ${error.message}</p>
    `;
  })
  .finally(() => console.log("Petición de Palkia terminada"));
 