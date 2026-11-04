const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon";

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

const URL_IMAGEN = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
const URL_IMAGEN_ALTERNATIVA = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

function obtenerNumero(url) {
  const partes = url.split("/");
  return partes[partes.length - 2];
}

function crearTarjeta(nombre, numero) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");

  const textoNumero = document.createElement("span");
  textoNumero.classList.add("numero");
  textoNumero.textContent = `Nº ${numero}`;

  const imagen = document.createElement("img");
  imagen.src = `${URL_IMAGEN}/${numero}.png`;
  imagen.alt = nombre;
  imagen.loading = "lazy";
  imagen.addEventListener("error", () => {
    const alternativa = `${URL_IMAGEN_ALTERNATIVA}/${numero}.png`;
    if (imagen.src !== alternativa) {
      imagen.src = alternativa;
    }
  });

  const titulo = document.createElement("h3");
  titulo.textContent = nombre;

  const boton = document.createElement("button");
  boton.type = "button";
  boton.textContent = "Ficha completa";
  boton.setAttribute("data-nombre", nombre);

  tarjeta.append(textoNumero, imagen, titulo, boton);
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

    if (datos.results.length === 0) {
      mostrarEstado("No hay Pokémon que mostrar.", "error");
    } else {
      mostrarEstado(`Se han cargado ${datos.results.length} Pokémon.`, "correcto");
    }
  } catch (error) {
    console.error("No se pudo cargar el listado:", error);
    mostrarEstado("No se ha podido cargar el listado de Pokémon.", "error");
  }
}

cargarListado();