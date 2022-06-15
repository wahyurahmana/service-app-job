'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Job, { foreignKey : 'companyId'})
    }
  }
  Company.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'name wajib diisi'
        },
        notEmpty : {
          msg : 'name tidak boleh kosong'
        }
      }
    },
    companyLogo: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'logo company wajib diisi'
        },
        notEmpty : {
          msg : 'logo company tidak boleh kosong'
        }
      }
    },
    location: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'lokasi wajib diisi'
        },
        notEmpty : {
          msg : 'lokasi tidak boleh kosong'
        }
      }
    },
    email: DataTypes.STRING,
    description: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'deskripsi wajib diisi'
        },
        notEmpty : {
          msg : 'deskripsi tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};