var Experience = require('../models/experience');

function experiencesIndex(req, res){
  Experience.find(function(err, experiences){
    if(err) return res.status(500).json({message: err});
    return res.status(200).json(experiences);
  })
}


function getExperience(req, res){
  var id = req.params.id;

  Experience.findById({_id: id}, function(err, experience){
    if(err) res.status(404).send(err);
    res.status(200).send(experience);
  }).select('-_v');
}


module.exports = {
  index: experiencesIndex,
  getExperience: getExperience
}
