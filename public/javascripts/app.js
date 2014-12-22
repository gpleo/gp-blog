'use strict';

var app = angular.module('app', ['ngRoute', 'ngSanitize', 'app.statistics']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/blogs', {
      templateUrl: 'views/tpl/blogs/list.html',
      controller: 'ListCtrl'
    })
    .when('/blogs/:_id', {
      templateUrl: 'views/tpl/blogs/detail.html',
      controller: 'DetailCtrl'
    })
    .otherwise({redirectTo: '/blogs'});
}]);