'use strict';

const socketio = require('socket.io');

module.exports = (server) => {
    const io = socketio(server);

    // ante cada nueva conexion
    io.on('connection', socket => {
        console.log('Nueva conexión de un cliente, con el id', socket.id);

        // nos suscribimos a eventos de cada socket
        socket.on('nuevo-mensaje', texto => {
            console.log('mensaje recibido de un cliente', texto);

            // emitir el mensaje a todos los clientes conectados
            io.emit('mensaje-desde-el-servidor', texto)
        });

        // simular un servicio de noticias
        setInterval(() => {
            socket.emit('noticia','noticia número ' + Date.now());
        }, 3000);


    });
};