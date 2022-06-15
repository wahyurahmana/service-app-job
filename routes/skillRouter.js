const Controller = require('../controllers/SkillController')
const { checkLogin, checkOwner } = require('../middlewares/authentication')

const router = require('express').Router()

router.get('/', Controller.getAllSkill)

module.exports = router