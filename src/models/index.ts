import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

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

// Escanea dinámicamente los modelos
const modelsPath = path.resolve(__dirname);
const modelFiles = fs
  .readdirSync(modelsPath)
  .filter((file) => file.endsWith('.ts') && file !== 'index.ts');

const models = modelFiles.map((file) => require(path.join(modelsPath, file)).default);

sequelize.addModels(models);

export default sequelize;
export const sequelizeModels = sequelize.models;
