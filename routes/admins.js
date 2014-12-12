'use strict';

var logger = require('log4js').getLogger('default');
var express = require('express');
var admins = express.Router();

admins.use(function (req, res, next) {
  logger.trace('enter admins router.');

  if (req.headers['authorization']) {
    var auth = req.headers['authorization'];
    if (auth && auth.substring(0, 6).toLowerCase() === 'basic ') {
      var up = new Buffer(auth.substring(6), 'base64').toString().split(':');
      if (up.length === 2 && up[0] === 'admin' && up[1] === 'Admin') {
        res.result = {success: true};
      }
    }
  }
  next();
});

admins.use(function (req, res, next) {
  logger.trace('finish admins router.');
  if (res.result && res.result.success) {
    next();
  } else {
    logger.debug('Login failure, authorization: ', req.headers['authorization']);
    res.set('WWW-Authenticate', 'Basic realm=""');
    res.status(401);
    res.end('401 Unauthorized.');
  }
});

module.exports = admins;
