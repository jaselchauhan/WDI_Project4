angular.module('wdiproject4', ['ngResource', 'ui.router', 'ngMaterial','satellizer', 'angular-jwt'])
  .config(Router)
  .constant('API_URL2', 'http://localhost:3000')
  .config(oauthConfig);

console.log('hi from app.js')

Router.$inject = ['$stateProvider', '$urlRouterProvider'];

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
    url: '/',
    templateUrl: 'home.html'
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

oauthConfig.$inject = ['API_URL2','$authProvider','EVENTBRITE_API_KEY', 'GITHUB_API_KEY'];

function oauthConfig(API_URL2, $authProvider, EVENTBRITE_API_KEY, GITHUB_API_KEY){

  $authProvider.oauth2({
    name: 'eventbrite',
    url: API_URL2 + '/auth/eventbrite',
    clientId: EVENTBRITE_API_KEY,
    authorizationEndpoint: 'https://www.eventbrite.com/oauth/authorize',
    redirectUri: location.origin,
    responseType: 'code'
  });

  $authProvider.github({
    url: API_URL2 + '/auth/github',
    clientId: GITHUB_API_KEY
  })

  $authProvider.httpInterceptor = function(config) {
    return !!config.url.match(API_URL2);
  };

  $authProvider.tokenPrefix = null;
}
