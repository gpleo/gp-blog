'use strict'

var logger = require('log4js').getLogger('default');
var express = require('express');
var blogs = express.Router();
var BlogModel = require('../models/BlogModel.js');
var blogModel = new BlogModel();

blogs.use(function (req, res, next) {
  logger.trace('enter blogs router.');
  next();
});

blogs.use('', require('./blogValidator.js'));

blogs.route('/')
  .get(function (req, res, next) {
    logger.trace('get blogs list.');

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

blogs.use(function (req, res, next) {
  logger.trace('finish blogs router.');
  if (res.result) {
    res.json(res.result);
  } else {
    next();
  }
});

module.exports = blogs;