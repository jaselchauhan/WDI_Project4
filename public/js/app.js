angular.module('wdiproject4', ['ngResource', 'ui.router', 'ngMaterial'])
  .config(Router);

console.log('hi from app.js')

Router.$inject = ['$stateProvider', '$urlRouterProvider'];

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('about', {
    url: '/about',
    templateUrl: 'about.html'
  })
  .state('experiences', {
    url: '/experiences',
    templateUrl: 'experiences.html'
  })
  .state('users', {
    url: '/users',
    templateUrl: 'users.html'
  })
  .state('experience', {
    url: '/experience',
    templateUrl: 'experience.html',
    controller: 'MapController as map'
  });

  $urlRouterProvider.otherwise('/');

}
