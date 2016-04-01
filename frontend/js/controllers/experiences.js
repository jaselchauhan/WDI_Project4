angular.module('wdiproject4')
  .controller('ExperiencesController', ExperiencesController);

ExperiencesController.$inject = ['$resource'];

function ExperiencesController($resource) {
  var self = this;

  var Experience = $resource('http://localhost:3000/experiences/:id', {
    id: '@_id'},{
    update: {method: "PATCH"}});

  this.all = Experience.query();

  // show a clicked experience
   this.selectExperience = function(experience) {
     self.selectedExperience = Experience.get({id: experience._id});
   };


}
