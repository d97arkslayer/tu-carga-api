import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', routes);

// Manejo de errores
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction,
  ) => {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: err.message || 'Error interno del servidor' });
  },
);

export default app;
