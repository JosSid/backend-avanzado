'use strict';

const mysql = require('mysql2/promise');

const MYSQL_CONNECTION_STRING = 'mysql://root:my-secret-pw@localhost:3306/cursonode';

async function main() {
  // crear una conexión
  const connection = await mysql.createConnection(MYSQL_CONNECTION_STRING);

  // hacer un consulta a la base de datos
  const result = await connection.execute('select * from agentes;');

  // pintar los resultados
  for (const agente of result[0]) {
    console.log(agente);
  }
}

main().catch(err => {
  console.log('Ocurrió un error:', err);
})