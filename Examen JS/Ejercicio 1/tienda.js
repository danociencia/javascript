class Juego {
  constructor(id, nombre, precio, disponible) {
    if (nombre.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }

    if (!Number.isFinite(precio) || precio <= 0) {
      throw new Error("El precio debe ser mayor que cero");
    }

    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.disponible = disponible;
  }
}

class Carrito {
  constructor() {
    this.lineas = [];
  }

  anadir(juego, cantidad) {
    if (!juego.disponible) {
      throw new Error("Ese juego no está disponible");
    }

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error("La cantidad debe ser un entero mayor que 0");
    }

    const linea = this.lineas.find(l => l.juego.id === juego.id);

    if (linea) {
      linea.cantidad += cantidad;
    } else {
      this.lineas.push({ juego: juego, cantidad: cantidad });
    }
  }

  calcularSubtotal() {
    return this.lineas.reduce((acumulado, linea) => acumulado + linea.juego.precio * linea.cantidad, 0);
  }

  calcularTotal() {
    let subtotal = this.calcularSubtotal();

    if (subtotal >= 50) {
      subtotal = subtotal * 0.9;
    }

    return Math.round(subtotal * 100) / 100;
  }

  resumen() {
    return this.lineas.map(l => ({
        nombre: l.juego.nombre,
        precio: l.juego.precio,
        cantidad: l.cantidad
    }));
  }
}


const catalogo = [
  new Juego(1, "Hollow Knight", 15, true),
  new Juego(2, "Celeste", 20, true),
  new Juego(3, "Outer Wilds", 25, false),
  new Juego(4, "Undertale", 10, true)
];


function anadirPorId(carrito, idTexto, cantidadTexto) {
  try {
    const id = Number(idTexto);
    const cantidad = Number(cantidadTexto);

    const juego = catalogo.find(j => j.id === id);

    if (!juego) {
      throw new Error("No existe ningún juego con ID " + idTexto);
    }

    carrito.anadir(juego, cantidad);
    console.log("Añadido: " + juego.nombre + " x" + cantidad);
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

function buscarPorNombre(texto) {
    const buscado = texto.toLowerCase();
    return catalogo.filter(j => j.disponible && j.nombre.toLowerCase().includes(buscado));
}

function carritoaJSON(carrito) {
    const datos = {
        fecha: new Date(),
        lineas: carrito.resumen(),
        total: carrito.calcularTotal()
    };

    return JSON.stringify(datos, null, 2);

}

function leerJSON(texto) {
    try {
        return JSON.parse(texto);
    } catch (error) {
        console.log("Error: el JSON está mal");
        return null;
    }
}

console.log(catalogo);

try {
  const juegoError = new Juego(5, "", 10, false);
  console.log("Esto no se imprime");
} catch (error) {
  console.log("Error:", error.message);
}

const carrito = new Carrito();

try {
  carrito.anadir(catalogo[1], 2);
  carrito.anadir(catalogo[1], 1);
  carrito.anadir(catalogo[2], 1);
} catch (error) {
  console.log("Error:", error.message);
}

console.log(carrito.lineas);
console.log(carrito.calcularSubtotal()); // 60
console.log(carrito.calcularTotal());    // 54

anadirPorId(carrito, "4", "2");    // Añadido: Undertale x2
anadirPorId(carrito, "9", "1");    // Error: no existe
anadirPorId(carrito, "3", "1");    // Error: no disponible
anadirPorId(carrito, "1", "abc");  // Error: cantidad no válida

console.log(buscarPorNombre("HOLLOW")); // [Hollow Knight]
console.log(buscarPorNombre("e"));      // Hollow, Celeste, Undertale (Outer Wilds no)

console.log(carrito.resumen());

const textoJSON = carritoaJSON(carrito);
console.log(textoJSON);
console.log(typeof textoJSON);          // "string"

console.log(leerJSON(textoJSON));       // vuelve a ser objeto
console.log(leerJSON("{esto no vale}")); // Error + null