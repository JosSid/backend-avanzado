var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const basicAuthMiddleware = require('./lib/basicAuthMiddleware');
const sessionAuth = require('./lib/sessionAuthMiddleware.js');
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');
const i18n = require('./lib/i18nConfigure.js');
const LoginController = require('./routes/loginController');
const PrivadoController = require('./routes/privadoController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); //Usa un motor de vistas custom, llamado html
app.engine('html', require('ejs').__express);//ese motor usa ejs

app.locals.title = 'Anuncios';

require('./lib/connectMongoose');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/pdf', express.static('d:/PDFS'));

const loginController = new LoginController();

/**
 * Rutas del API
 */
app.use('/api/agentes', jwtAuthMiddleware,require('./routes/api/agentes'));
app.use('/api/login', loginController.postJWT);

// Setup de i18n
app.use(i18n.init)

const privadoController = new PrivadoController();

app.use(session({
  name: 'nodeapp-session',
  secret: '=i]292<(!HU"g1};Z&:',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // expira a los 2 dias de inactividad de usuario
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_CONNECTION_STRING
  })
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

/**
 * Rutas del Website
 */

app.use('/',       require('./routes/index'));
app.use('/features',  require('./routes/features'));
app.use('/change-locale',  require('./routes/change-locale'));
app.use('/pedidos', require('./routes/pedidos'));
// usamos el estilo de controladores para facilitar el testing
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);
app.get('/privado', sessionAuth, privadoController.index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // comprobar si es un error de validaci??n
  if (err.array) {
    err.status = 422; // error de validaci??n
    const errorInfo = err.array({ onlyFirstError: true })[0];
    console.log(errorInfo);
    err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" ${errorInfo.msg}`;
  }

  res.status(err.status || 500);

  // si es una petici??n al API, responderemos con JSON
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
