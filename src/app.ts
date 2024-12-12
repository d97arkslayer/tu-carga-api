/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import { errorHandler } from '@middlewares/error.middleware';
import helmet from 'helmet';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Aplicar Helmet
app.use(helmet());

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', routes);

// Middleware de manejo de errores
// @ts-ignore
app.use((err, req, res, next) => errorHandler(err, req, res, next));

export default app;
