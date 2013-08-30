'use strict';

angular.module('ClientApp').controller('BlogCtrl', ['$scope', 'commsService', function ($scope, commsService) {
  $scope.awesomeThings = [
    'Blog page'
  ];

  commsService.getBlogListing(function(data) {
    $scope.posts = data;
  });
}]);
