"use strict";

// crear una función para usarla como constructor de objetos
function Fruta(nombre) {
  this.nombre = nombre;

  this.saluda = function() { console.log('hola soy', this.nombre)}
}

// crear un objeto con la función constructora de objetos
const limon = new Fruta('limon');
const naranja = new Fruta('naranja');

// console.log(limon);

// donde estén los parentesis de ejecución,
// mirar lo anterior al punto de la izquierda
// limon.saluda(); // this --> limon

// setTimeout(limon.saluda.bind(limon), 2000);

// const funcion = limon.saluda.bind(limon);
// funcion();

const funcion = limon.saluda;

funcion.call(naranja)

