var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const {verifyUser, verifyAdmin} = require('./middleware/auth')


dotenv.config();
var indexRouter = require('./routes/index');
const registro = require('./routes/registro')
const productos = require('./routes/productos')
const login = require('./routes/login')
const adminIndex = require('./routes/admin/index')
const adminProductos = require('./routes/admin/productos');
const adminEmpleados = require('./routes/admin/empleados');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : 'passwordSecreto',
  cookie : {maxAge: null},
  resave: true,
  saveUninitialized : false
}))


app.use('/', indexRouter);
app.use('/registro', registro);
app.use('/productos', productos);
app.use('/login', login);
app.use('/admin', verifyAdmin, adminIndex);
app.use('/admin/productos', verifyUser, adminProductos);
app.use('/admin/empleados', verifyUser, adminEmpleados);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
