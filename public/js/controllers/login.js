angular
  .module('wdiproject4')
  .controller('LoginController', LoginController);

LoginController.$inject = ['$auth', 'tokenService'];
function LoginController($auth, tokenService) {

  var self = this;

  this.isLoggedIn = function() {
    return !!tokenService.getToken();
  }

  this.currentUser = tokenService.getUser();

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        self.currentUser = tokenService.getUser();
      });
  }

  this.logout = function() {
    tokenService.removeToken();
    this.currentUser = null;
  }

}
