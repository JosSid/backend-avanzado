'use strict';

const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

class LoginController {
  index(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('login');
  }

  // login post desde el website
  async post(req, res, next) {
    try {
      const { email, password } = req.body;
    
      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email });

      // si no lo encuentro o no coincide la contraseña --> error
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.locals.error = res.__('Invalid credentials');
        res.locals.email = email;
        res.render('login');
        return;
      }

      // si existe y la contraseña coincide 

      // apunto en la sesión de usuario, que es un usuario logado
      req.session.usuarioLogado = usuario._id;

      // enviamos un email al usuario
      const result = await usuario.enviarEmail('Bienvenido ', 'Bienvenido a nodeapp')
      
      //--> redirigir a la zona privada
      res.redirect('/privado');
    } catch (err) {
      next(err);
    }
  }

  // login post al API
  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;
   
      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email });

      // si no lo encuentro o no coincide la contraseña --> error
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.statusCode = 401;
        res.json({ error: 'Invalid credentials'})
        return;
      }

      // si existe y la contraseña coincide 

      // generar un token JWT con su _id
      const token = jwt.sign({ _id: usuario._id}, process.env.JWT_SECRET, {
        expiresIn: '2d'
      });
      
      //--> redirigir a la zona privada
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }

  logout (req, res, next) {
    req.session.regenerate(err => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    })
  }
}

module.exports = LoginController;
