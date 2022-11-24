'use strict';

const { Usuario } = require('../models');

class PrivadoController {
  async index(req, res, next) {
    try {
      const usuarioID = req.session.usuarioLogado;

      const usuario = await Usuario.findById(usuarioID);

      if(!usuario) {
        next(new Error('usuario no encontrado'));
        return;
      }

      res.render('privado', {email: usuario.email});
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PrivadoController;
