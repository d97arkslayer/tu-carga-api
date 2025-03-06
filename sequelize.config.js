const path = require('path');
require('ts-node/register');
require('dotenv').config();


module.exports = {
  development: {
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin123',
    database: process.env.DB_NAME || 'tucarga',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    migrationStorage: 'sequelize', // Almacenar metadatos de migraciones
    migrationStorageTableName: 'migrations_meta', // Nombre de la tabla de metadatos
    seederStorage: 'sequelize', // Almacenar metadatos de seeders
    seederStorageTableName: 'seeders_meta', // Nombre de la tabla de metadatos
    models: [path.resolve(__dirname, '../models/*.ts')],
  },
  test: {
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin123',
    database: process.env.DB_NAME || 'tucarga_test',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    models: [path.resolve(__dirname, '../models/*.ts')],

  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    models: [path.resolve(__dirname, '../models/*.ts')],

  },
};
