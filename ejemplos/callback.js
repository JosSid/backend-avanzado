'use strict';

// callback

function suma(a, b, callback) {
  const resultado = a + b;
  callback(resultado);
}


const dato = suma(3, 4, function(dato) {
  console.log(dato)
});
