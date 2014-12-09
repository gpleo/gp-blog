'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/index', {
      templateUrl: '/views/tpl/blogs/list.html',
      controller: 'ListCtrl'
    })
    .otherwise({redirectTo: '/index'});
}]);