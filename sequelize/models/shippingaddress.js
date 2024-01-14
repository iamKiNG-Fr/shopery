'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ShoperyOrders, {foreignKey: 'shippingAddressId'});
      this.belongsTo(models.Users, {foreignKey: 'userId'});
      
    }
  }
  ShippingAddress.init({
    houseNumber:{
      type: DataTypes.SMALLINT
    },
    streetName:{
       type: DataTypes.STRING
      },
    addressLine:{
       type: DataTypes.STRING
      },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ShippingAddress',
  });
  return ShippingAddress;
};