import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        message: 'Validation Error',
        details: error.details.map((detail) => detail.message),
      });
      return; // Asegúrate de terminar la ejecución aquí
    }

    next(); // Llama a next() si no hay errores
  };
};
