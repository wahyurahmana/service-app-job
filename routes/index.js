const router = require('express').Router()
const JobRouter = require('./jobRoute.js')
const SkillRouter = require('./skillRouter.js')
const FavouriteRoute = require('./favouriteRoute')

router.get('/', (req, res, next) => {
  res.status(200).json({status : true, message : 'Hello'})
})

router.use('/jobs', JobRouter)
router.use('/skills', SkillRouter)
router.use('/favourite', FavouriteRoute)

module.exports = router