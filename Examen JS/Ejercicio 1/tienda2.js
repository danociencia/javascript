class Producto {
    constructor(id, nombre, precio, disponible) {

        if (nombre.trim() === "" ) {
            throw new Error("No puede estar vacio");
        }

        if (!Number.isFinite(precio) || precio <= 0) {
            throw new Error("No es un número válido");
        }

        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.disponible = disponible;

    }
}

const catalogo = [
    new Producto(1, "Té", 2.3, true),
    new Producto(2, "Agua", 1.0, true),
    new Producto(3, "Coca-cola", 2.25, true),
    new Producto(4, "Fanta", 3.0, true)
]