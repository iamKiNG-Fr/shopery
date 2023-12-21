'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Products, {foreignKey: 'productId'})
    }
  }
  Wishlist.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};