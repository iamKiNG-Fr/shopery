'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoperyOrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Products, {foreignKey: 'productId'});
      this.belongsTo(models.ShoperyOrders, {foreignKey: 'orderId'});
    }
  }
  ShoperyOrderDetails.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderItemQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderItemPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ShoperyOrderDetails',
  });
  return ShoperyOrderDetails;
};