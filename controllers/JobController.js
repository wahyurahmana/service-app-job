const {Job, Company, sequelize} = require('../models')
const { Op } = require("sequelize");

module.exports = class Controller {
  static getAllJobs (req, res, next) {
    let option = {
      include : [{
        model : Company
      }]
    }
    const search = []

    if(req.query.title){
      search.push({ title : {[Op.iLike]: `%${req.query.title}%`}})
    }

    if(req.query.jobType){
      search.push({ jobType : {[Op.iLike]: `%${req.query.jobType}%`}})
    }

    if(search.length !== 0){
      option.where = {
        [Op.and]: search
      }
    }
    
    Job.findAll(option)
      .then((result) => {
        res.status(200).json({status : true, data : result})
      }).catch((err) => {
        next(err)
      });
  }

  static async addJobs(req, res, next){
    const t = await sequelize.transaction()
    try {
      const dataCompany = {
        name : req.body.name,
        companyLogo : req.body.companyLogo,
        location : req.body.location,
        email : req.body.email,
        description : req.body.descriptionCompany
      }
      const dataJob = {
        title : req.body.title,
        description : req.body.descriptionJob,
        authorId : req.user.id,
        jobType : req.body.jobType
      }
      const company = await Company.create(dataCompany, { transaction: t })
      dataJob.companyId = company.id

      const job = await Job.create(dataJob, { transaction: t })
      await t.commit()
      res.status(200).json({status : true, data : {
        id : job.id,
        title : job.title
      }})
    } catch (error) {
      await t.rollback()
      next(error)
    }
  }

  static destroyJob(req, res, next) {
    Job.destroy({
      where : {
        id : req.params.jobId
      }
    })
      .then((result) => {
        res.status(200).json({status : true, message : `success delete id ${req.params.jobId}`})
      }).catch((err) => {
        next(err)
      });
  }

  static detailJob(req, res,next){
    Job.findOne({
      where : {
        id : req.params.jobId
      },
      include : [{
        model : Company,
        attributes : ['name','companyLogo', 'location', 'email','description']
      }]
    })
      .then((result) => {
        if(!result){
          throw {status : 404, message : 'data not found'}
        }else{
          res.status(200).json({status :  true, data : result})
        }
      }).catch((err) => {
        next(err)
      });
  }

  static async updateJob(req, res, next){
    const t = await sequelize.transaction()
    try {
      const dataCompany = {
        name : req.body.name,
        companyLogo : req.body.companyLogo,
        location : req.body.location,
        email : req.body.email,
        description : req.body.descriptionCompany
      }
      const dataJob = {
        title : req.body.title,
        description : req.body.descriptionJob,
        companyId : req.body.companyId,
        authorId : req.user.id,
        jobType : req.body.jobType
      }
      
      await Company.update(dataCompany,
        { 
          where : {
          id : dataJob.companyId
        }, transaction: t})

      await Job.update(dataJob, { where : {
        id : req.params.jobId
      }, transaction: t })
      await t.commit()
      res.status(200).json({status : true, message : `success update id ${req.params.jobId}`})
    } catch (error) {
      await t.rollback()
      next(error)
    }
  }
}