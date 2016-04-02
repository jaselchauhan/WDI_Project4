var User = require('../models/user');

function usersIndex(req, res){
  User.find(function(err, users){
    if(err) return res.status(500).json({message: err});
    return res.status(200).json(users);
  })
}


function getUser(req, res){
  var id = req.params.id;

  User.findById({_id: id}, function(err, user){
    if(err) res.status(404).send(err);
    res.status(200).send(user);
  }).select('-_v');
}


module.exports = {
  index: usersIndex,
  getUser: getUser
}
