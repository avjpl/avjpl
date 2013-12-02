'use strict';

angular.module('ClientApp').controller('AdminCtrl', ['$scope', 'commsService',
  function (scope, commsService) {

  scope.method = typeof scope.$stateParams.id == 'string' ? 'put': 'post';
  scope.url = typeof scope.$stateParams.id == 'string' ? 'http://avjpl-dev-server:3000/mongo-api/avjpl/blog/'
                                                          + scope.$stateParams.id
                                                        : 'http://avjpl-dev-server:3000/mongo-api/new/post';

  scope.labelAction = typeof scope.$stateParams.id == 'string' ? 'Update' : 'Add';

  if(typeof scope.$stateParams.id == 'string') {
    commsService.fetchBlogPostById(scope.$stateParams.id, function(data) {
      var tags = '';
      for ( var tag in data.tags ) {
        tags += data.tags[tag].name + ', ';
      };

      data.tags = tags.substr(0, tags.length - 2);

      scope.post = data;
    });
  }
}]);