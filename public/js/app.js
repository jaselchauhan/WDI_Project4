angular.module('wdiproject4', ['ngResource', 'ui.router', 'ngMaterial','satellizer', 'angular-jwt'])
  .config(Router)
  .constant('API_URL2', 'http://localhost:3000')
  .config(oauthConfig);

console.log('hi from app.js')

Router.$inject = ['$stateProvider', '$urlRouterProvider'];

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('about', {
    url: '/about',
    templateUrl: 'about.html'
  })
  .state('experiences', {
    url: '/',
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

oauthConfig.$inject = ['API_URL2','$authProvider','FACEBOOK_API_KEY', 'GITHUB_API_KEY'];

function oauthConfig(API_URL2, $authProvider, FACEBOOK_API_KEY, GITHUB_API_KEY){
  $authProvider.facebook({
    url: API_URL2 + '/auth/facebook',
    clientId: FACEBOOK_API_KEY
  })

  $authProvider.github({
    url: API_URL2 + '/auth/github',
    clientId: GITHUB_API_KEY
  })

  $authProvider.tokenPrefix = null;
}
