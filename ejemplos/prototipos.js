'use strict';

// definimos una función constructora de objetos
function Persona(nombre) {
  this.nombre = nombre;
}

// construir un objeto
const luis = new Persona('Luis');
const pepe = new Persona('Pepe');

// añadir propiedades al prototipo de las personas
Persona.prototype.saluda = function () {
  console.log('Hola soy', this.nombre);
}

luis.saluda();
pepe.saluda();

// Herencia de persona ---------------------------

function Agente(nombre) {
  // heredar el constructor de las personas
  // llamar al constructor de personas con mi this
  Persona.call(this, nombre);
}

// heredamos propiedades de las personas
Agente.prototype = Object.create(Persona.prototype);
Agente.prototype.constructor = Agente;

const brown = new Agente('Brown');

brown.saluda();

// Herencia múltiple -----------------------------

function Superheroe() {
  this.vuela = function() {
    console.log(this.nombre, 'vuela');
  }
  this.esquivaBalas = function() {
    console.log(this.nombre, 'esquiva balas');
  }
}

// copiamos todas las propiedades de Superheroe al prototipo de Agente
Object.assign(Agente.prototype, new Superheroe());

brown.vuela();
brown.esquivaBalas();