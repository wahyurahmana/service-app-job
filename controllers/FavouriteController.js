const {
  Favourite,
  Job
} = require('../models')

module.exports = class Controlller {

  static getFavourite(req, res, next) {
    Favourite.findAll({
        where: {
          authorId: req.user.id
        },
        include: [{
          model: Job
        }]
      })
      .then((result) => {
        res.status(200).json({
          status: true,
          data: result
        })
      }).catch((err) => {
        next(err)
      });
  }

  static addFavourite(req, res, next) {
    Favourite.create({
        authorId: req.user.id,
        jobId: req.params.jobId
      })
      .then((result) => {
        res.status(201).json({
          status: true,
          message: 'Data Favourite Berhasil Ditambahkan'
        })
      }).catch((err) => {
        next(err)
      });
  }

}