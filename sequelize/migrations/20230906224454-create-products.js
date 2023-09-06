'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      productPrice: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productThumbnail: {
        type: Sequelize.STRING
      },
      productPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      productDiscount: {
        type: Sequelize.DECIMAL
      },
      productDescription: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productWeight: {
        type: Sequelize.DECIMAL
      },
      productColour: {
        type: Sequelize.STRING
      },
      productStock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};