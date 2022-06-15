const Controller = require('../controllers/JobController')
const { checkLogin, checkOwner } = require('../middlewares/authentication')

const router = require('express').Router()

router.get('/', Controller.getAllJobs)
router.post('/', checkLogin, Controller.addJobs)
router.get('/:jobId', Controller.detailJob)
router.delete('/:jobId', checkLogin,checkOwner, Controller.destroyJob)
router.put('/:jobId', checkLogin,checkOwner, Controller.updateJob)

module.exports = router