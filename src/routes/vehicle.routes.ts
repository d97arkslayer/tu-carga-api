// src/routes/vehicle.routes.ts
import { Router } from 'express';
import vehicleController from '@controllers/vehicle.controller';
import { validate } from '@middlewares/validation.middleware';
import { authenticate } from '@middlewares/auth.middleware';
import {
  createVehicleSchema,
  updateVehicleSchema,
} from '@schemas/vehicle.schema';

const router = Router();

router.get('/', vehicleController.getAllVehicles);

router.get('/user', authenticate, vehicleController.getVehiclesByUser);

router.get('/:id', vehicleController.getVehicleById);

router.post(
  '/',
  validate(createVehicleSchema),
  vehicleController.createVehicle,
);

router.put(
  '/:id',
  validate(updateVehicleSchema),
  vehicleController.updateVehicle,
);

router.delete('/:id', vehicleController.deleteVehicle);

export default router;
