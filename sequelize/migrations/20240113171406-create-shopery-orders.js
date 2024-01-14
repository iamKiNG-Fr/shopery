'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShoperyOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      shippingAddressId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ShippingAddresses',
          key: 'id'
        }
      },
      orderTotal: {
        type: Sequelize.INTEGER
      },
      statusId: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        references: {
          model: 'OrderStatuses',
          key: 'id'
        }
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
    await queryInterface.dropTable('ShoperyOrders');
  }
};