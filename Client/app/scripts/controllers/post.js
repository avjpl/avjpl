'use strict';

angular.module('ClientApp').controller('PostCtrl', ['$scope', '$routeParams', '$location', 'commsService',
  function (scope, routeParams, location, commsService) {

	scope.action = 'Edit';
  scope.labelAction = 'Update';
  scope.postNo = 1245;

  commsService.fetchBlogPostById(routeParams.id, function(data) {
    scope.post = data;
  });
}]);