const {Skill, Job, Company} = require ('../models')

module.exports = class Controller {
  static getAllSkill(req, res, next){
    Skill.findAll({
      include : [{
        model : Job,
        attributes : ['title','description'],
        include : [{
          model : Company,
          attributes : ['name','email'],
        }]
      }]
    })
      .then((result) => {
        res.json(result)
      }).catch((err) => {
        next(err)
      });
  }
}