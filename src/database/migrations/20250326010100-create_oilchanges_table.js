'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OilChanges', {
      maintenanceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Maintenances',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      currentMileage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nextMileage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OilChanges');
  },
};
