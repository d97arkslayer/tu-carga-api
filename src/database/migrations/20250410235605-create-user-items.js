// src/database/migrations/XXXXXX-create_vehicles_table.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserItems', {
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
        comment: 'Foreign key to Users table',
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        comment: 'License category (e.g., A1, B1, etc.)',
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
          'Identifier of the item (e.g., license number)',
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
    await queryInterface.dropTable('UserItems');
  },
};
