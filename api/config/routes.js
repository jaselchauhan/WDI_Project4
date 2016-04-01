var router = require('express').Router();
var usersController = require('../controllers/users');
var experiencesController = require('../controllers/experiences');

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.getUser);


router.route('/experiences')
  .get(experiencesController.index);

router.route('/experiences/:id')
  .get(experiencesController.getExperience);

module.exports = router;
