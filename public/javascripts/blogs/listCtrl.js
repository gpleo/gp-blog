'use strict';

app.controller('ListCtrl', ['$http', '$q', '$scope', '$location', '$routeParams', 'app.statistics.mixpanel', function ($http, $q, $scope, $location, $routeParams, statistics) {
  var blogs = {},
    categories = {};

  blogs.current_page = 1;
  if ($routeParams.page && $routeParams.page > 0) {
    blogs.current_page = $routeParams.page;
  }
  blogs.category = '';
  if ($routeParams.category) {
    blogs.category = $routeParams.category;
  }
  blogs.pages = [1];

  var findBlogData = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/blogs?category=' + blogs.category + '&page=' + (blogs.current_page - 1),
      responseType: 'json'
    }).success(function (response) {
      blogs.success = response.success;
      blogs.error_message = response.error_message;
      blogs.list = response.list;

      if (response.success) {
        if (response.list.length === 0) {
          blogs.success = false;
          blogs.error_message = 'No records.';
        }
        if (response.count && response.count > 0 && response.limit && response.limit > 0) {
          var i,
            tmpPages = response.count / response.limit;
          blogs.pages = [];
          for (i = 1; i <= tmpPages; i ++) {
            blogs.pages.push(i);
          }
          if (response.count % response.limit > 0) {
            blogs.pages.push(i);
          }
        }
      }
    }).error(function (response) {
      blogs.success = false;
      blogs.error_message = response;
    });
    $scope.blogs = blogs;
  };

  var findCategoryData = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/categories',
      responseType: 'json'
    }).success(function (response) {
      categories.success = response.success;
      categories.error_message = response.error_message;
      categories.list = response.list;

      if (response.success) {
        if (response.list.length === 0) {
          categories.success = false;
          categories.error_message = 'No records.';
        }
      }
    }).error(function (response) {
      categories.success = false;
      categories.error_message = response;
    });
    $scope.categories = categories;
  };
  findBlogData();
  findCategoryData();

  statistics.trackList(blogs.current_page, blogs.category);

  var go = function (category, page) {
    $location.url('blogs?category=' + category + '&page=' + page);
  };
  $scope.goPage = function (page) {
    go(blogs.category, page);
  };
  $scope.goCategory = function (_id) {
    go(_id, 1);
  }
  $scope.goDetail = function (_id) {
    $location.url('blogs/' + _id);
  };
}]);
