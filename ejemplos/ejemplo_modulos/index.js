'use strict';

const calculadora = require('./calculadora');

calculadora.nombre = 'Casio';

console.log(calculadora.suma(3, 4));
console.log(calculadora.resta(3, 4));

const calculadora2 = require('./calculadora');
const calculadora3 = require('./calculadora');

console.log(calculadora3.nombre);