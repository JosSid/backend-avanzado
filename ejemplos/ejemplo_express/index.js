'use strict';

// cargar librería de express
const express = require('express');

// crear la aplicación
const app = express();

// este middleware se activa ante todas las peticiones
app.use((req, res, next) => {
  console.log('He recibido una petición de tipo', req.method, 'a', req.path);
  next();
});

// añadir una ruta
app.get('/', (req, res) => {
  res.send('hola');
});

app.get('/pedidos', (req, res, next) => {
  res.send('hola desde pedidos');
});

// middleware de errores
app.use((err, req, res, next) => {
  res.send('Ocurrió un error:' + err.message);
});

// arrancar la aplicación
app.listen(8080, () => {
  console.log('Servidor HTTP arrancado en http://localhost:8080');
});