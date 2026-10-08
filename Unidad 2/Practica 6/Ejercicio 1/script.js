class Libro {
    constructor(titulo, autor, numeroPags) {
        if(titulo === null || titulo === undefined || titulo === "") {
            throw new Error("El titulo no puede estar vacio")
        }

        if(isNaN(numeroPags) || numeroPags < 0) {
           throw new Error("No puede tener paginas negativas");
        }

        if(autor === null || autor === undefined || autor === "") {
            throw new Error("El titulo no puede estar vacio")
        }

        this.titulo = titulo;
        this.autor = autor;
        this.numeroPags = numeroPags;
    }

    describir() {
        const descripcion = [this.titulo, this.autor, this.numeroPags];
        return descripcion;
    }

    esExtenso() {
        if(this.numeroPags >= 300) {
            return true;
        } else return false;
    }
}

class Catalogo {
    constructor(libros) {
        this.libros = libros;
    }

    agregarLibro(Libro) {
        this.libros.push(libro);
    }

}

let libro = new Libro("Titulo", "Autor", 30);
Libro.describir();
console.log(Libro.esExtenso());

let libros = [];
let catalogo = new Catalogo(libros);
catalogo.agregarLibro(libro);
console.log(catalogo.libros);