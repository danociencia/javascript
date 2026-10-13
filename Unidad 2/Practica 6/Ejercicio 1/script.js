let libro1 = new Libro("El principito", "Antoine de Saint-Exupéry", 96);
let libro2 = new Libro("Cien años de soledad", "Gabriel García Márquez", 417);
let libro3 = new Libro("El señor de los anillos", "J.R.R. Tolkien", 1216);

libro1.describir();
libro2.esExtenso();

let catalogo = new Catalogo(libro1, libro2);
catalogo.agregarLibro(libro3);
catalogo.buscarLibro("El señor de los anillos");
catalogo.eliminarLibro(libro3);

catalogo.listarLibros();