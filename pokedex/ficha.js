const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon";

const estadoFicha = document.querySelector("#estado-ficha");
const fichaPokemon = document.querySelector("#ficha-pokemon");

if (estadoFicha === null || fichaPokemon === null) {
  throw new Error("Falta un elemento necesario en ficha.html");
}

async function obtenerDatos(url) {
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  return respuesta.json();
}

function mostrarEstado(mensaje, tipo) {
  estadoFicha.textContent = mensaje;
  estadoFicha.classList.remove("cargando", "error");

  if (tipo) {
    estadoFicha.classList.add(tipo);
  }
}

function mostrarFicha(pokemon) {
  const titulo = document.createElement("h3");
  titulo.textContent = `${pokemon.name} (Nº ${pokemon.id})`;

  const imagen = document.createElement("img");
  imagen.src = pokemon.sprites.other["official-artwork"].front_default;
  imagen.alt = pokemon.name;

  const tipos = document.createElement("p");
  const nombresTipos = pokemon.types.map(elemento => elemento.type.name);
  tipos.textContent = `Tipos: ${nombresTipos.join(", ")}`;

  const altura = document.createElement("p");
  altura.textContent = `Altura: ${pokemon.height / 10} m`;

  const peso = document.createElement("p");
  peso.textContent = `Peso: ${pokemon.weight / 10} kg`;

  const tituloHabilidades = document.createElement("h4");
  tituloHabilidades.textContent = "Habilidades";

  const listaHabilidades = document.createElement("ul");
  for (const elemento of pokemon.abilities) {
    const habilidad = document.createElement("li");
    habilidad.textContent = elemento.ability.name;
    listaHabilidades.append(habilidad);
  }

  fichaPokemon.replaceChildren(
    titulo,
    imagen,
    tipos,
    altura,
    peso,
    tituloHabilidades,
    listaHabilidades
  );
}

async function cargarFicha() {
  const parametros = new URLSearchParams(window.location.search);
  const nombre = parametros.get("pokemon");

  if (nombre === null || nombre.trim() === "") {
    mostrarEstado("No se ha indicado ningún Pokémon.", "error");
    return;
  }

  mostrarEstado("Cargando ficha…", "cargando");

  try {
    const pokemon = await obtenerDatos(`${URL_POKEMON}/${encodeURIComponent(nombre)}`);
    mostrarFicha(pokemon);
    mostrarEstado("");
  } catch (error) {
    console.error("No se pudo cargar la ficha:", error);

    if (error.message.includes("404")) {
      mostrarEstado("No existe ese Pokémon.", "error");
    } else {
      mostrarEstado("No se ha podido cargar la ficha.", "error");
    }
  }
}

cargarFicha();