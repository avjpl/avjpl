'use strict';

angular.module('ClientApp').service('commsService', function commsService($http) {
  var commsService = {};

  commsService.getBlogListing = function(callback) {
    $http.get('http://avjpl-dev-server:3000/mongo-api/avjpl/blog').success(function(data) {
      callback(data);
    });
  };

  commsService.fetchBlogPostById = function(id, callback) {
    $http.get('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/' + id).success(function(data) {
      callback(data);
    });
  };

  commsService.updateBlogPostById = function(id, callback) {
    $http.put('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/' + id).success(function(data) {
      callback(data);
    });
  };

  commsService.deleteBlogPostById = function(id, callback) {
    $http.delete('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/' + id).success(function(data) {
      callback(data);
    });
  };

  commsService.addBlogPostComment = function(id, callback) {
    $http.put('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/' + id).success(function(data) {
      callback(data);
    });
  };

  commsService.deleteBlogPostComment = function(id, callback) {
    $http.delete('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/' + id).success(function(data) {
      callback(data);
    });
  };

  // commsService.newPost = function(data, callback) {
  //   $http.post('http://avjpl-dev-server:3000/blog/admin/new', data).success(function(msg) {
  //     callback(msg);
  //   });
  // };

  return commsService;
});