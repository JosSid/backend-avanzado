'use strict';

console.log('empiezo');

function escribeTras2Segundos(texto, cb) {
  setTimeout(function() {
    console.log(texto);
    cb()
  }, 2000);
}

// llamar a la función fn, n veces, en serie
function serie(n, fn, callbackTerminacion) {
  if (n == 0) {
    // termino
    callbackTerminacion();
    return;
  }
  n = n - 1;
  fn('texto' + n, function() {
    serie(n, fn, callbackTerminacion);
  })
}

serie(6, escribeTras2Segundos, function() {
  console.log('termino')
})
