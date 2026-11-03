const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon";
const URL_IMAGEN = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const formulario = document.querySelector("#formulario-busqueda");
const campoNombre = document.querySelector("#nombre-pokemon");
const estadoBusqueda = document.querySelector("#estado-busqueda");
const listado = document.querySelector("#listado-pokemon");

if (
  formulario === null ||
  campoNombre === null ||
  estadoBusqueda === null ||
  listado === null
) {
  throw new Error("Falta un elemento necesario en index.html");
}

async function obtenerDatos(url) {
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  return respuesta.json();
}

function mostrarEstado(mensaje, tipo) {
  estadoBusqueda.textContent = mensaje;
  estadoBusqueda.classList.remove("cargando", "error", "correcto");

  if (tipo) {
    estadoBusqueda.classList.add(tipo);
  }
}

function obtenerNumero(url) {
  const partes = url.split("/");
  return partes[partes.length - 2];
}

function crearTarjeta(nombre, numero) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");

  const imagen = document.createElement("img");
  imagen.src = `${URL_IMAGEN}/${numero}.png`;
  imagen.alt = nombre;
  imagen.loading = "lazy";

  const titulo = document.createElement("h3");
  titulo.textContent = nombre;

  const boton = document.createElement("button");
  boton.type = "button";
  boton.textContent = "Ficha completa";
  boton.setAttribute("data-nombre", nombre);

  tarjeta.append(imagen, titulo, boton);
  return tarjeta;
}

async function cargarListado() {
  mostrarEstado("Cargando Pokémon…", "cargando");
  listado.replaceChildren();

  try {
    const datos = await obtenerDatos(`${URL_POKEMON}?limit=20`);

    for (const resultado of datos.results) {
      const numero = obtenerNumero(resultado.url);
      listado.append(crearTarjeta(resultado.name, numero));
    }

    mostrarEstado(`Se han cargado ${datos.results.length} Pokémon.`, "correcto");
  } catch (error) {
    console.error("No se pudo cargar el listado:", error);
    mostrarEstado("No se ha podido cargar el listado de Pokémon.", "error");
  }
}

function irAFicha(nombre) {
  window.location.href = `ficha.html?pokemon=${encodeURIComponent(nombre)}`;
}

async function buscarPokemon(nombre) {
  mostrarEstado("Buscando…", "cargando");

  try {
    const pokemon = await obtenerDatos(`${URL_POKEMON}/${encodeURIComponent(nombre)}`);
    irAFicha(pokemon.name);
  } catch (error) {
    console.error("Error en la búsqueda:", error);

    if (error.message.includes("404")) {
      mostrarEstado("No se ha encontrado ese Pokémon.", "error");
    } else {
      mostrarEstado("No se ha podido realizar la búsqueda.", "error");
    }
  }
}

listado.addEventListener("click", evento => {
  if (!(evento.target instanceof Element)) {
    return;
  }

  const boton = evento.target.closest("button[data-nombre]");

  if (boton !== null && listado.contains(boton)) {
    irAFicha(boton.getAttribute("data-nombre"));
  }
});

formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  const nombre = campoNombre.value.trim().toLowerCase();

  if (nombre === "") {
    mostrarEstado("Escribe el nombre de un Pokémon.", "error");
    return;
  }

  buscarPokemon(nombre);
});

cargarListado();