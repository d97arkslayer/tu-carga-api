'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MaintenanceItems', [
      {
        maintenanceId: 1,
        description: 'Filter replacement',
        price: 25.50,
        currentMileage: 15000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        maintenanceId: 4,
        description: 'Engine check',
        price: 75.00,
        currentMileage: 35000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        maintenanceId: 2,
        description: 'Tire rotation',
        price: 49.99,
        currentMileage: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MaintenanceItems', null, {});
  }
};
