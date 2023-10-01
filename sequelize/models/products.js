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
      this.belongsTo(models.ProductType, {foreignKey: 'typeId'});
      this.belongsTo(models.Category, {foreignKey: 'categoryId'});
      this.hasMany(models.ProductTag, {foreignKey: 'productId'});
      this.hasOne(models.PopularProducts, {foreignKey: 'productId'});
      this.hasOne(models.FeaturedProducts, {foreignKey: 'productId'});
      this.hasOne(models.BestSellers, {foreignKey: 'productId'});
      this.hasOne(models.HotDeals, {foreignKey: 'productId'});
      this.hasOne(models.TopRated, {foreignKey: 'productId'});
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
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productRating:{
      type: DataTypes.SMALLINT,
      defaultValue: 0
    } 
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};