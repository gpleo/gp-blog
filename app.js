'use strict'

require('sugar');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');

var log4js = require('log4js');
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(__dirname + '/logs/log4js.log'), 'default');
var logger = log4js.getLogger('default');
//logger.setLevel('ERROR');
logger.setLevel('TRACE');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
// log error
var errorLogfile = fs.createWriteStream(__dirname + '/logs/error.log', {flags: 'a'});
app.use(morgan('combined', {
  skip: function (req, res) {
    return res.statusCode < 400;
  },
  stream: errorLogfile
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator([]));
app.use(cookieParser());

app.use('/admin', require('./routes/admins.js'));
app.use(express.static(path.join(__dirname, 'public')));

//app.get('/', function (req, res) {
//  res.sendfile('public/index.html');
//});
//
//app.get('/admin', function (req, res) {
//  res.sendfile('public/admin/index.html');
//});

app.use('/blogs', require('./routes/blogs.js'));
app.use('/categories', require('./routes/categories.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

mongoose.connect('mongodb://localhost:27017/demo');
mongoose.connection.on('error', function (err) {
  logger.error('... mongodb connection error ...', err.message);
});
mongoose.connection.once('open', function () {
  logger.info('... mongodb open ...');
});

module.exports = app;
