'use strict';

var app = angular.module('app', ['ngRoute', 'ngSanitize']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/index', {
      templateUrl: 'views/tpl/blog/create.html',
      controller: 'CreateCtrl'
    })
    .otherwise({redirectTo: '/index'});
}]);