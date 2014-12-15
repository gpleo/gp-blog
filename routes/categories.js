'use strict'

var logger = require('log4js').getLogger('default');
var express = require('express');
var categories = express.Router();
var CategoryModel = require('../models/CategoryModel.js');
var categoryModel = new CategoryModel();

categories.use(function (req, res, next) {
  logger.trace('enter categories router.');
  next();
});

categories.route('/')
  .get(function (req, res, next) {
    logger.trace('get categories list.');

    categoryModel.list({}, function (error, docs) {
      if (error) {
        res.result = {
          success: false,
          error_message: error
        }
      } else {
        res.result = {
          success: true,
          list: docs
        }
      }
      next();
    });
  })

categories.use(function (req, res, next) {
  logger.trace('finish categories router.');
  if (res.result) {
    res.json(res.result);
  } else {
    next();
  }
});

module.exports = categories;