const formulario = document.querySelector("#formulario-busqueda");
const busqueda = document.querySelector("#busqueda");
const estado = document.querySelector("#estado");
const resultados = document.querySelector("#resultados");

console.log(formulario, busqueda, estado, resultados);

let usuarios = [];

async function cargarUsuarios() {
    estado.textContent = "Cargando...";

    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!respuesta.ok) {
            throw new Error("Error " + respuesta.status);
        }

        usuarios = await respuesta.json();
        mostrarUsuarios(usuarios);
        estado.textContent = "Usuarios cargados: " + usuarios.length;
        console.log(usuarios);
    } catch (error) {
        estado.textContent = "No han cargado " + error.message;
    } finally {
        console.log("Fin");
    }
}

function mostrarUsuarios(lista) {
  resultados.replaceChildren();

  if (lista.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No hay usuarios que mostrar";
    resultados.append(li);
    return;
  }

  for (const usuario of lista) {
    const li = document.createElement("li");
    li.textContent = usuario.name + " - " + usuario.email;
    resultados.append(li);
  }
}

formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  const texto = busqueda.value.trim().toLowerCase();

  if (texto === "") {
    mostrarUsuarios(usuarios);
    estado.textContent = "Mostrando todos: " + usuarios.length;
    return;
  }

  const filtrados = usuarios.filter(usuario => usuario.name.toLowerCase().includes(texto));
  mostrarUsuarios(filtrados);
  estado.textContent = "Resultados: " + filtrados.length;
});

cargarUsuarios();