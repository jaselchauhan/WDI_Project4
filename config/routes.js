var router = require('express').Router();
var usersController = require('../controllers/users');
var experiencesController = require('../controllers/experiences');


router.get('/', function(req,res){
  res.render('index');
});

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.getUser);


router.route('/experiences')
  .post(experiencesController.query);

// router.route('/experiences/:id')
//   .get(experiencesController.getExperience);

module.exports = router;
