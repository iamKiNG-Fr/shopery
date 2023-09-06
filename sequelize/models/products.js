'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return {...this.get(), id: undefined}
    }
  }
  Products.init({
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productThumbnail: {
      type: DataTypes.STRING
    },
    productPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    productDiscount: {
      type: DataTypes.DECIMAL
    },
    productDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productWeight: {
      type: DataTypes.DECIMAL
    },
    productColour: {
      type: DataTypes.STRING
    },
    productStock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};