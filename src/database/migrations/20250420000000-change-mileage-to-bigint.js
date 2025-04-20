'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('OilChanges', 'currentMileage', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });
    
    await queryInterface.changeColumn('OilChanges', 'nextMileage', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('OilChanges', 'currentMileage', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    
    await queryInterface.changeColumn('OilChanges', 'nextMileage', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};