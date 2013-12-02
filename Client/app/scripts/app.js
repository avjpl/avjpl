'use strict';

angular.module('ClientApp', ['ui.router', 'ngSanitize']).config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // $locationProvider.html5Mode(true);

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');

  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/views/home.html'
    })
    // added an optional pageNo param here
    .state('blog', {
      url: '/blog/{pageNo}',
      templateUrl: '/views/blog.html',
      controller: 'BlogCtrl'
    })
    .state('post', {
      url: '/blog/post/:id',
      templateUrl: '/views/post.html',
      controller: 'PostCtrl'
    })
    .state('edit', {
      url: '/blog/post/edit/:id',
      templateUrl: '/views/form.html',
      controller: 'AdminCtrl'
    })
    .state('new', {
      url: '/new/blog/post',
      templateUrl: '/views/form.html',
      controller: 'AdminCtrl'
    })
    .state('portfolio', {
      url: '/portfolio',
      templateUrl: '/views/portfolio.html'
    })
    .state('resume', {
      url: '/resume',
      templateUrl: '/views/resume.html'
    });
}).run(function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});