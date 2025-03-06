// src/database/seeders/YYYYMMDDHHMMSS-seed-users.js
'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'John',
        lastName: 'Doe',
        phone: '123456789',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane',
        lastName: 'Smith',
        phone: '987654321',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
