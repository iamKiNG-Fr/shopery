'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Products, {foreignKey: 'categoryId'});
    }
    toJSON(){
      return {...this.get(), id: undefined}
    }
  }
  Category.init({
    uuid:{
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryImage: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};