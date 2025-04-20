// src/database/seeders/XXXXXX-seed_vehicles.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vehicles', [
      {
        plate: 'ABC123',
        userId: 1,
        year: 2020,
        make: 'Toyota',
        dniOwner: '1234567890',
        dniOwnerType: 'CC',
        vehicleType: 'car',
        line: 'Toyota Corolla',
        engineDisplacement: 1800,
        serviceType: 'private',
        engineId: 'ENG123456',
        VIN: '1HGBH41JXMN109186',
        chassisId: 'CHS123456',
        color: 'red',
        passengerCapacity: 5,
        fuelType: 'gasolina',
        registrationDate: new Date('2020-01-15'),
        from: 'Bogotá',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        plate: 'XYZ789',
        userId: 1,
        year: 2018,
        make: 'Ford',
        dniOwner: '0987654321',
        dniOwnerType: 'NIT',
        vehicleType: 'truck',
        line: 'Ford F-150',
        engineDisplacement: 5000,
        serviceType: 'public',
        engineId: 'ENG789012',
        VIN: '2FMZA51636BA91486',
        chassisId: 'CHS789012',
        color: 'white',
        passengerCapacity: 3,
        fuelType: 'diesel',
        registrationDate: new Date('2019-06-20'),
        from: 'Medellín',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        plate: 'DEF456',
        userId: 1,
        year: 2021,
        make: 'Honda',
        dniOwner: '4567891230',
        dniOwnerType: 'CC',
        vehicleType: 'car',
        line: 'Honda Civic',
        engineDisplacement: 2000,
        serviceType: 'private',
        engineId: 'ENG456789',
        VIN: '3HGCM567X3H123456',
        chassisId: 'CHS456789',
        color: 'blue',
        passengerCapacity: 5,
        fuelType: 'gasolina',
        registrationDate: new Date('2021-05-10'),
        from: 'Cali',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        plate: 'GHI012',
        userId: 1,
        year: 2019,
        make: 'Chevrolet',
        dniOwner: '3216549870',
        dniOwnerType: 'NIT',
        vehicleType: 'truck',
        line: 'Chevrolet Silverado',
        engineDisplacement: 6000,
        serviceType: 'public',
        engineId: 'ENG321654',
        VIN: '4GAKRAED8K1234567',
        chassisId: 'CHS321654',
        color: 'black',
        passengerCapacity: 2,
        fuelType: 'diesel',
        registrationDate: new Date('2019-09-15'),
        from: 'Barranquilla',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};

