// src/database/migrations/YYYYMMDDHHMMSS-add-email-verification-fields.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'verificationCode', {
      type: Sequelize.STRING(6),
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'isVerified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    await queryInterface.addColumn('Users', 'verificationCodeExpires', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'verificationCode');
    await queryInterface.removeColumn('Users', 'isVerified');
    await queryInterface.removeColumn('Users', 'verificationCodeExpires');
  }
};
