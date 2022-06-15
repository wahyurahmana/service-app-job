const { verify } = require("../helper/jwt")
const {Job} = require ('../models')
const checkLogin = (req, res, next) => {
  try {
    const access_token = req.headers.access_token
    if (!access_token) {
      throw {
        status: 401,
        message: 'access token tidak ditemukan'
      }
    }
    let decoded = verify(access_token)
    req.user = {
      id : decoded.id,
      email : decoded.email
    }
    next()
  } catch (err) {
    next(err)
  }
}

const checkOwner = (req, res, next) => {
  Job.findByPk(req.params.jobId)
    .then((result) => {
      if(!result){
        throw {status : 404, message : 'data tidak ditemukan'}
      }
      if(result.authorId === req.user.id){
        next()
      }else{
        throw {status : 403, message : 'tidak ada akses ke sini'}
      }
    }).catch((err) => {
      next(err)
    });
}

module.exports = {
  checkLogin, checkOwner
}