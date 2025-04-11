'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserItems', [
      {
        userId: 3,
        category: 'license',
        issueDate: new Date('2024-02-01'),
        expiryDate: new Date('2029-02-01'),
        itemIdentifier: 'LIC901234',
        vehicleType: 'particular',
        licenseCategory: 'A1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserItems', {
      itemIdentifier: { [Sequelize.Op.in]: ['LIC345678', 'LIC901234'] }
    }, {});
  },
};
