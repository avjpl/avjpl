'use strict';

angular.module('ClientApp').controller('AdminCtrl', ['$scope', 'commsService',
  function (scope, commsService) {

  commsService.fetchBlogPostById(scope.$stateParams.id, function(data) {
    var tags = '';
    for ( tag in data.tags ) {
      tags += data.tags[tag].name + ', ';
    };

    data.tags = tags.substr(0, tags.length - 2);

    scope.post = data;
  });

  scope.labelAction = scope.$stateParams.action;
}]);