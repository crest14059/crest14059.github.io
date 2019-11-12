/*
 * Setup Angular App
 */
angular.module('CPApp',
               ['ngRoute', 'main']) 
  .config(['$locationProvider','$routeProvider',
           function($locationProvider, $routeProvider) {

             $routeProvider.
               when('/', {
                 templateUrl: 'dist/main.html',
                 controller: 'MainController'
               }).otherwise({redirectTo: '/'}); 

           }]);
