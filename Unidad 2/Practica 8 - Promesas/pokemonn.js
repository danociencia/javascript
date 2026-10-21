const urlListado = "https://pokeapi.co/api/v2/pokemon?limit=5";
 
 
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
 
 
async function obtenerPokemon() {
  document.body.innerHTML = "<h1>Pokémon</h1><p>Cargando...</p>";
 
  try {
    const datos = await obtenerDatos(urlListado);
    const urlPrimero = datos.results[0].url;
 
    const pokemon = await obtenerDatos(urlPrimero);
    console.log("Pokémon recibido:", pokemon);
    mostrarPokemon(pokemon);
  } catch (error) {
    console.error("No se pudo obtener el Pokémon:", error.message);
    document.body.innerHTML = `
      <h1>Pokémon</h1>
      <p>No se pudo cargar el Pokémon: ${error.message}</p>
    `;
  } finally {
    console.log("Petición terminada");
  }
}
 
obtenerPokemon();