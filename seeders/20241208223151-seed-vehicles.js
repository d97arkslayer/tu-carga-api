'use strict';
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Vehicles',
      [
        {
          make: 'Toyota',
          model: 'Corolla',
          year: 2020,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          make: 'Ford',
          model: 'Focus',
          year: 2018,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
  },
};
