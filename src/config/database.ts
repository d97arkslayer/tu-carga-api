import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});

// Escanea y carga modelos
const modelsPath = path.resolve(__dirname, '../models');
const modelFiles = fs
  .readdirSync(modelsPath)
  .filter((file) => file.endsWith('.ts') && file !== 'index.ts');

console.log('Model files detected:', modelFiles);

const models = modelFiles.map((file) => {
  const model = require(path.join(modelsPath, file));
  console.log('Model loaded:', model);
  return model.default || model;
});

try {
  sequelize.addModels(models);
  console.log('Models added to Sequelize');
} catch (error) {
  console.error('Error adding models:', error);
}

export default sequelize;
