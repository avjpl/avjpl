'use strict';

angular.module('ClientApp').controller('BlogCtrl', ['$scope', 'commsService', function (scope, commsService) {

//    var pageNo = scope.$stateParams.pageNo ? scope.$stateParams.pageNo : '';

//    scope.search = '';

//  commsService.getTotalDocumentCount(function(data) {
//    scope.totalPages = new Array(data.totalPages);
//  });

    commsService.fetchBlogPostCategories(function(data) {
        scope.categories = data;
    });

    commsService.getBlogListing(function(data) {
        scope.posts = data;
    });

//    scope.doSearch = function() {
//        console.log(scope.search);
//
//        scope.search = '';
//    };
}]);
