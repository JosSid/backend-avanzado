'use strict';

// función que devuelve una promesa
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(5);
      // reject('error fatal');
    }, ms);
  })
}

async function main() {

  try {
    const resultado = await sleep(2000);
    console.log('han pasado 2 segundos, con resultado:', resultado);
  } catch (err) {
    console.log('fallo el primer sleep');
  }

  await sleep(3000);
  console.log('han pasado 3 segundos');

  for( let i = 0; i <= 5; i++) {
    await sleep(1000);
    console.log('ha pasado 1 segundo');
  }

}

main().catch(err => {
  console.log('Ocurrió un error:', err);
})