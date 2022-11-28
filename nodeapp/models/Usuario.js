'use strict';

const mongoose = require(`mongoose`);
const bcrypt = require('bcrypt');
const emailTransportConfigure = require('../lib/emailTransportConfigure');
const nodemailer = require('nodemailer')

// crear el esquema
const usuarioSchema = mongoose.Schema({
    email: { type: String, unique: true},
    password: String
});

// método estático
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
    return bcrypt.hash(passwordEnClaro, 7);
};

// método de instancia
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
    return bcrypt.compare(passwordEnClaro, this.password);
};

usuarioSchema.methods.enviarEmail = async function(asunto, cuerpo) {
    //recuperar el transport
    const transport = await emailTransportConfigure();

    // enviar email
    const result = await transport.sendMail({
        from: process.env.EMAIL_SERVICE_FROM,
        to: this.email,
        subject: asunto,
        html: cuerpo
    });

    console.log(`Mensaje enviado: ${result.messageId}`);

    //previsualizacion del mensaje enviado
    console.log(`URL de previsualizacion: ${nodemailer.getTestMessageUrl(result)}`);

    return result;

};

//crear el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// exporto el modelo
module.exports = Usuario;