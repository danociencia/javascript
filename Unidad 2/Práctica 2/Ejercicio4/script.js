const ahora = new Date();

console.log(ahora.getDate());
console.log(ahora.getMonth());
console.log(ahora.getFullYear());

console.log(new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(ahora));

