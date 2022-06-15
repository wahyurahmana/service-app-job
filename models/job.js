'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Company, {foreignKey : 'companyId'})
      Job.hasMany(models.Skill, {foreignKey : 'jobId'})
    }
  }
  Job.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'title wajib diisi'
        },
        notEmpty : {
          msg : 'title tidak boleh kosong'
        }
      }
    },
    description: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'description wajib diisi'
        },
        notEmpty : {
          msg : 'description tidak boleh kosong'
        }
      }
    },
    companyId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    jobType: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'tipe job wajib diisi'
        },
        notEmpty : {
          msg : 'tipe job tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};