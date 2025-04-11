// src/database/migrations/XXXXXX-create_vehicles_table.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VehicleItems', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vehicles', // Nombre de la tabla referenciada
          key: 'id', // Campo de la tabla referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'Foreign key to Vehicles table',
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        comment: 'Item type (e.g., soat, technical review, etc.)',
      },
      issueDate: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Date of issue',
      },
      expiryDate: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Date of expiry',
      },
      itemIdentifier: {
        type: Sequelize.STRING,
        allowNull: true,
        comment:
          'Identifier of the item (e.g., soat number, technical review number)',
      },
      cost: {
        type: Sequelize.FLOAT,
        allowNull: true,
        comment: 'Cost of the item',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VehicleItems');
  },
};
