'use strict';

app.controller('ListCtrl', ['$http', '$q', '$scope', '$location', function ($http, $q, $scope, $location) {
  $scope.current_page = 1;

  var findData = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/blogs?page=' + ($scope.current_page - 1),
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
  };
  findData();

  $scope.goPage = function (page) {
    $scope.current_page = page;
    findData();
  };
  $scope.goDetail = function (_id) {
    $location.path('blogs/' + _id);
  };
}]);
