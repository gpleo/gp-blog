'use strict'

var logger = require('log4js').getLogger('default');
var express = require('express');
var blog = express.Router();
var BlogModel = require('../models/BlogModel.js');
var blogModel = new BlogModel();

blog.use(function (req, res, next) {
  logger.trace('enter blog router.');
  next();
});

blog.use('', require('./blogValidator.js'));

blog.route('/')
  .get(function (req, res, next) {
    logger.trace('get blog list.');

    blogModel.list(function (error, docs) {
      if (error) {
        res.result = {
          success: false,
          error_message: error
        }
      } else {
        res.result = {
          success: true,
          docs: docs
        }
      }
      next();
    });
  })
  .post(function (req, res, next) {
    logger.trace('post a blog.');

    blogModel.create(req.data, function (error) {
      if (error) {
        res.result = {
          success: false,
          error_message: error
        }
      } else {
        res.result = {
          success: true
        }
      }
      next();
    });
  });

blog.use(function (req, res, next) {
  logger.trace('finish blog router.');
  if (res.result) {
    res.json(res.result);
  } else {
    next();
  }
});

module.exports = blog;