'use strict';

const connectionPromise = require('./connectAMQP') // cargar mi conector de amqp

const QUEUE_NAME = 'tareas';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

main().catch(err => console.log('Hubo un error: ', err));

async function main() {
    // conectar al servidor AMQP
    const connection = await connectionPromise;

    // crear un canal
    const canal = await connection.createChannel();

    // asegurar que existe una cola
    await canal.assertQueue(QUEUE_NAME, {
        durable: true // la cola resiste a reinicios del broker
    });

    canal.prefetch(1); // para que me de los mensajes de uno en uno

    canal.consume(QUEUE_NAME, async mensaje => {
      try {
        const payload = mensaje.content.toString();
        console.log(payload);

      await sleep(1);

      // confirmo que he procesado el mensaje
      canal.ack(mensaje);
      } catch (err){
        console.log('Error en el mensaje ', payload);
        // diferenciar si es un error operacional
        canal.nack(mensaje); // dead letter queue
      };
      
    });
};
