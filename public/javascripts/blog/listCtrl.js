'use strict';

app.controller('ListCtrl', ['$http', '$q', '$scope', function ($http, $q, $scope) {
  $http({
    method: 'GET',
    url: 'http://localhost:3000/blog/',
    responseType: 'json'
  }).success(function (response) {
    if (response.docs.length === 0) {
      $scope.success = false;
      $scope.error_message = 'No records.';
    } else {
      $scope.success = response.success;
      $scope.error_message = response.error_message;
      $scope.blogs = response.docs;
    }
  }).error(function (response) {
    $scope.success = false;
    $scope.error_message = response;
  });
}]);
