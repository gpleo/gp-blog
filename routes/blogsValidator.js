var logger = require('log4js').getLogger('default');
var express = require('express');
var blogsValidator = express.Router();

blogsValidator.route('/')
  .post(function (req, res, next) {
    logger.trace('enter blogsValidator /.post');

    req.assert('title', 'required').notEmpty();
    req.assert('contents', 'required').notEmpty();
    if (req.validationErrors()) {
      res.status(400);
      res.json({
        success: false,
        error_message: req.validationErrors()
      });
    } else {
      req.data = {
        title: req.body.title,
        contents: req.body.contents
      }
      next();
    }
  });

module.exports = blogsValidator;