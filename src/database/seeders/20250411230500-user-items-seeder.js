'use strict';

const { UserItemTypes } = require('../../utils/consts.utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserItems', [
      {
        userId: 1,
        category: UserItemTypes.license,
        issueDate: new Date('2023-01-15'),
        expiryDate: new Date('2028-01-15'),
        itemIdentifier: 'LIC123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        category: UserItemTypes.license,
        issueDate: new Date('2022-06-20'),
        expiryDate: new Date('2027-06-20'),
        itemIdentifier: 'LIC789012',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserItems', null, {});
  },
};
