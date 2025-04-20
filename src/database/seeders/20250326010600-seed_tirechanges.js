'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TireChanges', [
      // ...existing tire change items...
      {
        maintenanceId: 2,
        lastChangeDate: new Date('2022-01-15'),
        nextChangeDate: new Date('2023-01-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // New tire change record for maintenanceId 5
      {
        maintenanceId: 5,
        lastChangeDate: new Date('2023-02-02'),
        nextChangeDate: new Date('2024-02-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TireChanges', null, {});
  }
};
