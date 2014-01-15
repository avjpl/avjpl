'use strict';

angular.module('ClientApp').service('commsService', function commsService($http) {
  var api = {};

  api.getBlogListing = function(pageNo, callback) {
    $http.get('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/' + pageNo).success(function(data) {
      callback(data);
    });
  };

  api.getTotalDocumentCount = function(callback) {
    $http.get('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/count').success(function(data) {
      callback(data);
    });
  };

  api.fetchBlogPostById = function(id, callback) {
    $http.get('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/view/' + id).success(function(data) {
      callback(data);
    });
  };

  api.fetchLatest = function(db, collection, limit, callback) {
    $http.get('http://avjpl-dev-server:3000/mongo-api/' + db + '/' + collection + '/' + limit + '/latest').success(function(data) {
      callback(data);
    });
  };

  api.fetchBlogPostCategories = function(callback) {
    $http.get('http://avjpl-dev-server:3000/mongo-api/categories').success(function(data) {
      callback(data);
    });
  };

  api.updateBlogPostById = function(id, callback) {
    $http.put('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/' + id).success(function(data) {
      callback(data);
    });
  };

  api.deleteBlogPostById = function(id, callback) {
    $http.delete('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/' + id).success(function(data) {
      callback(data);
    });
  };

  api.addBlogPostComment = function(id, callback) {
    $http.put('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/' + id).success(function(data) {
      callback(data);
    });
  };

  api.deleteBlogPostComment = function(id, callback) {
    $http.delete('http://avjpl-dev-server:3000/mongo-api/avjpl/blog/' + id).success(function(data) {
      callback(data);
    });
  };

  return api;
});
