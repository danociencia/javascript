class Libro {
    constructor(titulo, autor, numeroPags) {
        if(titulo === null || titulo === undefined || titulo === "") {
            throw new Error("El titulo no puede estar vacio")
        }

        if(isNaN(numeroPags) || numeroPags < 0) {
           throw new Error("No puede tener paginas negativas");
        }

        if(autor === null || autor === undefined || autor === "") {
            throw new Error("El autor no puede estar vacio")
        }

        this.titulo = titulo;
        this.autor = autor;
        this.numeroPags = numeroPags;
    }

    describir() {
        document.body.innerHTML += `El libro ${this.titulo} fue escrito por ${this.autor} y tiene ${this.numeroPags} paginas <br>`;
    }

    esExtenso() {
        if(this.numeroPags >= 300) {
            document.body.innerHTML += `El libro ${this.titulo} es extenso <br>`;
        } else {
            document.body.innerHTML += `El libro ${this.titulo} no es extenso <br>`;
        }
    }
}