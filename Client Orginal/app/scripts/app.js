'use strict';

angular.module('ClientApp', []).config(function($routeProvider, $locationProvider) {
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
  }).when('/blog/post/:id', {
    templateUrl: '/views/post.html',
    controller: 'BlogCtrl'
  }).when('/blog/form/', {
    templateUrl: '/views/form.html',
    controller: 'BlogCtrl'
  }).otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
});