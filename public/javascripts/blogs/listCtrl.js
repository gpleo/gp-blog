'use strict';

app.controller('ListCtrl', ['$http', '$q', '$scope', '$location', function ($http, $q, $scope, $location) {
  $http({
    method: 'GET',
    url: 'http://localhost:3000/blogs/',
    responseType: 'json'
  }).success(function (response) {
    if (response.success && response.docs.length === 0) {
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

  $scope.goDetail = function (_id) {
    $location.path('blogs/' + _id);
  };
}]);
