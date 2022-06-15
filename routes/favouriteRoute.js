const { checkLogin } = require('../middlewares/authentication')
const Controlller = require('../controllers/FavouriteController')

const router = require('express').Router()

router.get('/',checkLogin,  Controlller.getFavourite)
router.post('/:jobId', checkLogin, Controlller.addFavourite)

module.exports = router