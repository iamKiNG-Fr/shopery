'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoperyOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ShoperyOrderDetails, {foreignKey: 'orderId'});
      this.belongsTo(models.Users, {foreignKey: 'userId'})
      this.belongsTo(models.ShippingAddress, {foreignKey: 'shippingAddressId'})
      this.belongsTo(models.OrderStatus, {foreignKey: 'statusId'})
    }
  }
  ShoperyOrders.init({
    paymentMethod: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: { 
      type: DataTypes.INTEGER,
    allowNull: false
    },
    shippingAddressId: { 
      type: DataTypes.INTEGER,
    allowNull: false
    },
    orderTotal: { 
      type: DataTypes.INTEGER,
    allowNull: false
    },
    statusId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'ShoperyOrders',
  });
  return ShoperyOrders;
};