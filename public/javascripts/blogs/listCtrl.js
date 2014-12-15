'use strict';

app.controller('ListCtrl', ['$http', '$q', '$scope', '$location', '$routeParams', function ($http, $q, $scope, $location, $routeParams) {
  $scope.current_page = 1;
  if ($routeParams.page && $routeParams.page > 0) {
    $scope.current_page = $routeParams.page;
  }
  $scope.pages = [1];

  var findData = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/blogs?page=' + ($scope.current_page - 1),
      responseType: 'json'
    }).success(function (response) {
      $scope.success = response.success;
      $scope.error_message = response.error_message;
      $scope.blogs = response.list;

      if (response.success) {
        if (response.list.length === 0) {
          $scope.success = false;
          $scope.error_message = 'No records.';
        }
        if (response.count && response.count > 0 && response.limit && response.limit > 0) {
          var i,
            tmpPages = response.count / response.limit;
          $scope.pages = [];
          for (i = 1; i <= tmpPages; i ++) {
            $scope.pages.push(i);
          }
          if (response.count % response.limit > 0) {
            $scope.pages.push(i);
          }
        }
      }
    }).error(function (response) {
      $scope.success = false;
      $scope.error_message = response;
    });
  };
  findData();

  $scope.goPage = function (page) {
    $location.url('blogs?page=' + page);
  };
  $scope.goDetail = function (_id) {
    $location.url('blogs/' + _id);
  };
}]);
