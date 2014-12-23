'use strict';

var logger = require('log4js').getLogger('default');
var express = require('express');
var blogsAuthorizer = express.Router();
var authorizer = require('./authorizer.js');

blogsAuthorizer.route('/')
  .post(authorizer.httpBaseAuth);

module.exports = blogsAuthorizer;