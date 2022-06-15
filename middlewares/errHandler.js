module.exports = (err, req, res, next) => {
  let statusCode = err.status || 500
  let message = err.message
  if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
    statusCode = 400
    message = err.errors[0].message
  }

  if(err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 404
    message = 'Data Tidak Ditemukan Pada Table'
  }
  
  res.status(statusCode).json({status : false, message})
}