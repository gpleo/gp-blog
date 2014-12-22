'use strict';

app.controller('DetailCtrl', ['$http', '$q', '$scope', '$routeParams', 'app.statistics.mixpanel', function ($http, $q, $scope, $routeParams, statistics) {
  $http({
    method: 'GET',
    url: 'http://localhost:3000/blogs/' + $routeParams._id,
    responseType: 'json'
  }).success(function (response) {
    if (response.success && !response.doc) {
      $scope.success = false;
      $scope.error_message = 'No record.';
    } else {
      $scope.success = response.success;
      $scope.error_message = response.error_message;
      $scope.blog = response.doc;
    }
  }).error(function (response) {
    $scope.success = false;
    $scope.error_message = response;
  });

  statistics.trackDetail($routeParams._id);
}]);
