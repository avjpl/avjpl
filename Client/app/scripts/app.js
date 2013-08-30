'use strict';

angular.module('ClientApp', []).config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  }).when('/blog', {
      templateUrl: 'views/blog.html',
      controller: 'BlogCtrl'
    }).when('/portfolio', {
      templateUrl: 'views/portfolio.html',
      controller: 'PortfoilioCtrl'
    }).when('/resume', {
      templateUrl: 'views/resume.html',
      controller: 'ResumeCtrl'
    }).when('/post', {
      templateUrl: 'views/post.html',
      controller: 'ResumeCtrl'
    }).otherwise({
      redirectTo: '/'
    });
});