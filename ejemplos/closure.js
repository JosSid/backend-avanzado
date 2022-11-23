'use strict';

// funcion que devuelve un objeto
function creaVehiculo(nombre) {
  const numeroCilindros = 4;
  return {
    getNombre: function() { return nombre; },
    // getNombre() { return nombre; },
    setNombre: function(valor) { nombre = valor; },
    saluda: function() { console.log('Hola, soy un', nombre, 'y tengo', numeroCilindros, 'cilindros'); }
  }
}

const coche = creaVehiculo('Opel Astra');

coche.saluda();

console.log(coche);

setTimeout(coche.saluda, 2000);