'use strict';

// función que devuelve una promesa
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5);
      // reject('error fatal');
    }, ms);
  })
}

const promesa = sleep(2000);

console.log(promesa);

promesa.catch(err => {
  console.log('falló el primer sleep');
  return Promise.reject();
}).then((resultado) => {
  if (resultado) {
    console.log('pasaron los 2 segundos, con resultado:', resultado);
  }
  return sleep(3000);
}).then(() => {
  console.log('pasaron otros 3 segundos');
  return sleep(1000);
}).then(() => {
  console.log('pasó 1 segundo más');
}).catch(err => {
  console.log('Ha ocurrido un error:', err);
});

Promise.all([sleep(5000), sleep(3000), sleep(1000)]).then(() => {
  console.log('terminaron todas las promesas sleep');
})