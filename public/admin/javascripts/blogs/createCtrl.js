'use strict';

app.controller('CreateCtrl', ['$http', '$q', '$scope', function ($http, $q, $scope) {
  CKEDITOR.replace('ckeditor', {
    extraPlugins: 'codesnippet'
  });

  $scope.save = function () {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/blogs/',
      data: {
        title: $('#title').val(),
        contents: CKEDITOR.instances.ckeditor.getData()
      },
      responseType: 'json'
    }).success(function (response) {
      if (response.success) {
        alert('保存成功！');
      } else {
        alert('保存失败！' + response.error_message);
      }
    }).error(function (response) {
      alert('保存失败！' + response);
    });
  };

}]);
