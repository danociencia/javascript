class Catalogo {
    constructor(...libros) {
        this.libros = libros;
    }

    agregarLibro(libro) {
        let existe = false;

        for(let existence of this.libros) {
            if(existence === libro) {
                existe = true;
            }
        }

        if(existe) {
            document.body.innerHTML += `El libro ${libro.titulo} ya existe en el catalogo <br>`;
        } else {
            this.libros.push(libro);
            document.body.innerHTML += `El libro ${libro.titulo} fue agregado al catalogo <br>`;
        }

    }

    eliminarLibro(libro) {
        let eliminado = false;
        for(let i = 0; i < this.libros.length; i++) {
            if(this.libros[i] === libro) {
                this.libros.splice(i, 1);
                eliminado = true;
            }
        }
        if(!eliminado) {
            document.body.innerHTML += `El libro ${libro.titulo} no existe en el catalogo <br>`;
        } else {
            document.body.innerHTML += `El libro ${libro.titulo} fue eliminado del catalogo <br>`;
        }
    }

    buscarLibro(titulo) {
        let encontrado = false;
        for(let libro of this.libros) {
            if(libro.titulo === titulo) {
                encontrado = true;
            }
        }
        if(encontrado) {
            document.body.innerHTML += `El libro ${titulo} fue encontrado en el catalogo <br>`;
        } else {
            document.body.innerHTML += `El libro ${titulo} no existe en el catalogo <br>`;
        }
    }

    listarLibros() {
        document.body.innerHTML += `El catalogo tiene los siguientes libros: <br>`;
        for(let libro of this.libros) {
            document.body.innerHTML += `El libro ${libro.titulo} fue escrito por ${libro.autor} y tiene ${libro.numeroPags} paginas <br>`;
        }

    }

}