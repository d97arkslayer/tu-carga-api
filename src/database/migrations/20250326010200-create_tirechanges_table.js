'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TireChanges', {
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
      lastChangeDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      nextChangeDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('TireChanges');
  },
};
