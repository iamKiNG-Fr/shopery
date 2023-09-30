'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Products, {foreignKey: 'productId'});
      this.belongsTo(models.Tag, {foreignKey: 'tagId'});
    }
  }
  ProductTag.init({
    uuid:{
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    productId: {
      type: DataTypes.INTEGER
    },
    tagId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ProductTag',
  });
  return ProductTag;
};