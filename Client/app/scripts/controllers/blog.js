'use strict';

angular.module('ClientApp')
  .controller('BlogCtrl', ['$scope', '$routeParams', 'commsService', function ($scope, $routeParams, commsService) {
  $scope.awesomeThings = [
    'Blog page'
  ];

  commsService.getBlogListing(function(data) {
    $scope.posts = data;
  });

  commsService.fetchBlogPostById($routeParams.id, function(data) {
    $scope.post = data;
  });
}]);
