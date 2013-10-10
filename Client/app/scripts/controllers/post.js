'use strict';

angular.module('ClientApp').controller('PostCtrl', ['$scope', '$location', 'commsService',
  function (scope, location, commsService) {

  scope.action = 'Edit';
  scope.labelAction = 'Update';
  scope.postNo = 1245;

  commsService.fetchBlogPostById(scope.$stateParams.id, function(data) {
    scope.post = data;
  });
}]);