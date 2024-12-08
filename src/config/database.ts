import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { models } from '../models'; // Importa el index de models

// Cargar variables de entorno
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models, // Ruta de los modelos
  logging: false,
});

export default sequelize;
