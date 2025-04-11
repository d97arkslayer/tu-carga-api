'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // ...existing migration code...
    await queryInterface.addColumn('UserItems', 'vehicleType', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'particular',
      comment: 'Indicates if vehicle is particular or public',
    });
    await queryInterface.addColumn('UserItems', 'licenseCategory', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'A1',
      comment: 'License category details',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('UserItems', 'licenseCategory');
    await queryInterface.removeColumn('UserItems', 'vehicleType');
  },
};
