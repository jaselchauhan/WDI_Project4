angular.module('wdiproject4', ['ngResource', 'ui.router'])
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
  });

  $urlRouterProvider.otherwise('/');

}
