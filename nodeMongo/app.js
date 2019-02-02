let createError = require('http-errors');
let express = require('express');

let path = require('path');
let cookieParser = require('cookie-parser');
let morgan  = require('morgan');
let winston = require('./config/winston');

var bodyParser   = require('body-parser');
var session      = require('express-session');
var passport = require('passport');

let indexRouter = require('./routes/index');
let newsRouter = require('./routes/newsRoute');
var authRoutes   = require('./routes/auth');

let app = express();
require('./config/passport')(passport);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// required for passport
app.use(session({
  secret: 'eminem', // session secret
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/auth', authRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
