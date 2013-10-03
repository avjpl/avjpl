'use strict';

angular.module('ClientApp').controller('BlogCtrl', ['$scope', '$routeParams', '$location', 'commsService',
  function (scope, routeParams, location, commsService) {

  commsService.getBlogListing(function(data) {
    scope.posts = data;
  });

  // scope.submit = function() {
  //   var data = {};
  //   var filePath = $('input[name="file"]').val();
  //   var fileIdx = filePath.lastIndexOf('\\') + 1;

  //   data.title = scope.title;
  //   data.file = filePath.substr(fileIdx);
  //   data.description = CKEDITOR.instances.description.getData();
  //   data.content = CKEDITOR.instances.content.getData();
  //   data.tags = scope.tag;

  //   console.log();

  //   // commsService.newPost(data, function(msg) {
  //   //   scope.msg = msg;
  //   // });

  //   return false;
  // };
}]);