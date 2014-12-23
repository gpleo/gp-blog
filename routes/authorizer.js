'use strict';

var logger = require('log4js').getLogger('default');

exports.httpBaseAuth = function (req, res, next) {
  logger.trace('enter authorizer httpBaseAuth.');

  var rightful = false;

  if (req.headers['authorization']) {
    var auth = req.headers['authorization'];
    if (auth && auth.substring(0, 6).toLowerCase() === 'basic ') {
      var up = new Buffer(auth.substring(6), 'base64').toString().split(':');
      if (up.length === 2 && up[0] === 'admin' && up[1] === 'Admin') {
        rightful = true;
      }
    }
  }

  if (rightful) {
    next();
  } else {
    logger.debug('Login failure, authorization: ', req.headers['authorization']);
    res.set('WWW-Authenticate', 'Basic realm=""');
    res.status(401);
    res.json({
      success: false,
      error_message: '401 Unauthorized.'
    });
  }
};