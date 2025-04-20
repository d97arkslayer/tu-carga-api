'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Maintenances', [
      // ...existing maintenance items...
      {
        vehicleId: 1,
        type: 'oil_change',
        serviceCenter: 'Quick Lube',
        price: 99.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        vehicleId: 1,
        type: 'tire_change',
        serviceCenter: 'Tire Shop',
        price: 199.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        vehicleId: 1,
        type: 'other',
        serviceCenter: null,
        price: 150.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // New items
      {
        vehicleId: 2,
        type: 'oil_change',
        serviceCenter: 'Express Oil',
        price: 110.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        vehicleId: 2,
        type: 'tire_change',
        serviceCenter: 'Speedy Tires',
        price: 220.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Maintenances', null, {});
  }
};
