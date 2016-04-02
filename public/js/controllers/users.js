angular.module('wdiproject4')
  .controller('UsersController', UsersController);


UsersController.$inject = ['$resource'];

function UsersController($resource) {
  var self = this;

  var User = $resource('http://localhost:3000/users/:id', {
    id: '@_id'},{
    update: {method: "PATCH"}});

  this.all = User.query();

  // show a clicked user
   this.selectUser = function(user) {
     self.selectedUser = User.get({id: user._id});
   };

}
