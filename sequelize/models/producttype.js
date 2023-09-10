'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Products, {foreignKey: 'typeId'});
    }
    toJSON(){
      return {...this.get(), id: undefined}
    }
  }
  ProductType.init({
    uuid:{
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    typeName: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ProductType',
  });
  return ProductType;
};