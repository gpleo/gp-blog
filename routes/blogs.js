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

blogs.use('', require('./blogsValidator.js'));

blogs.route('/')
  .get(function (req, res, next) {
    logger.trace('get blogs list.');

    var data = {
      page: req.query.page
    };
    blogModel.list(data, function (error, docs) {
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

blogs.route('/:_id')
  .get(function(req, res, next) {
    logger.trace('get blog detail. _id: ' + req.params._id);

    blogModel.get(req.params._id, function (error, doc) {
      if (error) {
        res.result = {
          success: false,
          error_message: error
        }
      } else {
        res.result = {
          success: true,
          doc: doc
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