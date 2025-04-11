'use strict';

const { VehicleItemTypes } = require('../../utils/consts.utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VehicleItems', [
      {
        vehicleId: 1,
        type: VehicleItemTypes.soat,
        issueDate: new Date('2024-01-01'),
        expiryDate: new Date('2025-01-01'),
        itemIdentifier: 'SOAT123456',
        cost: 150.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        vehicleId: 1,
        type: VehicleItemTypes.insurance,
        issueDate: new Date('2024-02-01'),
        expiryDate: new Date('2025-02-01'),
        itemIdentifier: 'INS789012',
        cost: 300.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        vehicleId: 2,
        type: VehicleItemTypes.roadkit,
        issueDate: new Date('2024-03-01'),
        expiryDate: null,
        itemIdentifier: 'RK345678',
        cost: 50.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VehicleItems', null, {});
  },
};
