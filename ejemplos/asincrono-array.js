'use strict';

console.log('empiezo');

function escribeTras2Segundos(texto, cb) {
  setTimeout(function() {
    console.log(texto);
    cb()
  }, 2000);
}

// llamar a la función fn, con un array, en serie
function serie(arr, fn, callbackTerminacion) {
  if (arr.length == 0) {
    // termino
    callbackTerminacion();
    return;
  }
  fn('texto' + arr.shift(), function() {
    serie(arr, fn, callbackTerminacion);
  })
}

serie([1,2,3,4,5,6], escribeTras2Segundos, function() {
  console.log('termino')
})
