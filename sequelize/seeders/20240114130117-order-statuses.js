'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
      await queryInterface.bulkInsert('OrderStatuses', [{
        id:1,
        status: 'order received',
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        id:2,
        status: 'processing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        id:3,
        status: 'on the way',
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        id:4,
        status: 'delivered',
        createdAt: new Date(),
        updatedAt: new Date(),
      },], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     */
     await queryInterface.bulkDelete('OrderStatuses', null, {});
     
  }
};
