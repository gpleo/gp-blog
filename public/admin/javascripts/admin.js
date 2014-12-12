'use strict';

var app = angular.module('app', ['ngRoute', 'ngSanitize']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/blogs', {
      templateUrl: 'views/tpl/blogs/create.html',
      controller: 'CreateCtrl'
    })
    .otherwise({redirectTo: '/blogs'});
}]);