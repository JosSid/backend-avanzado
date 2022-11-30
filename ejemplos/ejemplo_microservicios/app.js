'use strict';

// esta app necesita un microservicio que le haga los cambios de moneda

const { Requester } = require('cote');

const requester = new Requester({ name: 'app'});

const evento = {
    type: 'convertir-moneda',

    cantidad: 100,
    desde: 'USD',
    hacia: 'EUR'
};

setInterval(() => {
    console.log(Date.now(), 'pido un cambio de moneda' )
    requester.send(evento, resultado => {
        console.log(Date.now(), 'app obtiene resultado: ',resultado )
    })
}, 1000)