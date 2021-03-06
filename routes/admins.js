'use strict';

var logger = require('log4js').getLogger('default');
var express = require('express');
var admins = express.Router();
var authorizer = require('./authorizer.js');

admins.use(authorizer.httpBaseAuth);

module.exports = admins;
