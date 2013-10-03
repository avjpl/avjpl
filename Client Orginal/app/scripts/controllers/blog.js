'use strict';

angular.module('ClientApp')
  .controller('BlogCtrl', ['$scope', '$routeParams', 'commsService',
    function (scope, routeParams, commsService) {
  scope.awesomeThings = [
    'Blog page'
  ];

  scope.action = 'Edit';
  scope.labelAction = 'Update';
  scope.postNo = 1245;

  // commsService.getBlogListing(function(data) {
  //   $scope.posts = data;
  // });

  // commsService.fetchBlogPostById($routeParams.id, function(data) {
  //   $scope.post = data;
  // });

  scope.submit = function() {
    var data = {};
    var filePath = $('input[name="file"]').val();
    var fileIdx = filePath.lastIndexOf('\\') + 1;

    data.title = scope.title;
    data.file = filePath.substr(fileIdx);
    data.description = CKEDITOR.instances.description.getData();
    data.content = CKEDITOR.instances.content.getData();
    data.tags = scope.tag;

    console.log(data);

    commsService.newPost(data, function(msg) {
      scope.msg = msg;
    });

    return false;
  };
}]);