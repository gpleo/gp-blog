'use strict';

app.controller('CreateCtrl', ['$http', '$q', '$scope', function ($http, $q, $scope) {
  CKEDITOR.replace('ckeditor', {
    extraPlugins: 'codesnippet'
  });
  $('#datetime').datetimepicker({
    changeMonth: true,
    changeYear: true
  });
  $('#datetime').datetimepicker("option", "dateFormat", "yy-mm-dd");

  var categories = {};
  $http({
    method: 'GET',
    url: 'http://localhost:3000/categories',
    responseType: 'json'
  }).success(function (response) {
    categories.success = response.success;
    categories.error_message = response.error_message;
    categories.list = response.list;

    if (response.success && response.list.length === 0) {
      categories.success = false;
      categories.error_message = 'No records.';
    }
  }).error(function (response) {
    categories.success = false;
    categories.error_message = response;
  });
  $scope.categories = categories;
  $scope.category = '';

  $scope.save = function () {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/blogs/',
      data: {
        title: $('#title').val(),
        created_at: $('#datetime').val(),
        category: $scope.category,
        contents: CKEDITOR.instances.ckeditor.getData()
      },
      responseType: 'json'
    }).success(function (response) {
      if (response.success) {
        alert('保存成功！');
      } else {
        alert('保存失败！' + JSON.stringify(response.error_message));
      }
    }).error(function (response) {
      alert('保存失败！' + JSON.stringify(response));
    });
  };

}]);
