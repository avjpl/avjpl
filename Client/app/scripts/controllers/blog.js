'use strict';

angular.module('ClientApp').controller('BlogCtrl', ['$scope', 'commsService',
  function (scope, commsService) {

  var pageNo = scope.$stateParams.pageNo ? scope.$stateParams.pageNo : '';

  commsService.getTotalDocumentCount(function(data) {
    scope.totalPages = new Array(data.totalPages);
  });

  commsService.fetchBlogPostCategories(function(data) {
    scope.categories = data;
  });

  commsService.getBlogListing(pageNo, function(data) {
    scope.posts = data;
  });
}]);