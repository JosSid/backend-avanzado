"use strict";

// crear una función para usarla como constructor de objetos
function Fruta(nombre) {
  this.nombre = nombre;

  this.saluda = function() { console.log('hola soy', this.nombre)}
}

// crear un objeto con la función constructora de objetos
const limon = new Fruta('limon');

console.log(limon);

limon.saluda(); // this --> limon