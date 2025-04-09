// src/database/migrations/XXXXXX-create_vehicles_table.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nombre de la tabla referenciada
          key: 'id', // Campo de la tabla referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        comment: 'Foreign key to Users table'
      },
      plate: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Vehicle plate/identifier'
      },
      dniOwner: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Owner identification number'
      },
      dniOwnerType: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Type of identification (e.g., CC, NIT)'
      },
      vehicleType: {
        type: Sequelize.ENUM('car', 'truck', 'motorcycle'),
        allowNull: false
      },
      line: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Vehicle model/line'
      },
      make: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Vehicle make/manufacturer'
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Year of manufacture'
      },
      engineDisplacement: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Engine displacement in cc'
      },
      serviceType: {
        type: Sequelize.ENUM('private', 'public'),
        allowNull: false
      },
      engineId: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Engine identification number'
      },
      VIN: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Vehicle Identification Number'
      },
      chassisId: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Chassis identification number'
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passengerCapacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Passenger capacity'
      },
      fuelType: {
        type: Sequelize.ENUM('gasolina', 'gas', 'diesel'),
        allowNull: false
      },
      registrationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: 'Vehicle registration date'
      },
      from: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Origin or location of the vehicle'
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
    await queryInterface.dropTable('Vehicles');
  },
};
