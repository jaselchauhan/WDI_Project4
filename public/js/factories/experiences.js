angular.module('wdiproject4')
  .factory('Experience', Experience);

Experience.$inject = ['$resource'];

function Experience ($resource) {

  return $resource('http://localhost:3000/experiences/:id', { id: '@_id'},{
    update: {method: "PATCH"}
  });

}
