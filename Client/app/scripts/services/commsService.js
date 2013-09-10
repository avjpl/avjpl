'use strict';

angular.module('ClientApp').service('commsService', function commsService($http) {
  var commsService = {};

  commsService.getBlogListing = function(callback) {
    $http.get('http://avjpl-dev-server:3000/blog').success(function(data) {
      callback(data);
    });
  };

  commsService.fetchBlogPostById = function(id, callback) {
    $http.get('http://avjpl-dev-server:3000/blog/post/' + id).success(function(data) {
      callback(data);
    });
  };

  return commsService;
});
