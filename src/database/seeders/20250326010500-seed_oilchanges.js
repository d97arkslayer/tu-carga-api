'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('OilChanges', [
      // ...existing oil change items...
      {
        maintenanceId: 1,
        currentMileage: 15000,
        nextMileage: 20000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // New oil change record for maintenanceId 4
      {
        maintenanceId: 4,
        currentMileage: 35000,
        nextMileage: 40000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OilChanges', null, {});
  }
};
