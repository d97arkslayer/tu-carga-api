import { Router } from 'express';
import {
  getVehicles,
  createVehicleHandler,
  getVehicleHandler,
  updateVehicleHandler,
  deleteVehicleHandler,
} from '@controllers/vehicle.controller';
import { validate } from '@schemas/validation.middleware';
import { vehicleSchema } from '../schemas/vehicle.schema';

const router = Router();

router.get('/', getVehicles);
router.post('/', validate(vehicleSchema), createVehicleHandler);
router.get('/:id', getVehicleHandler);
router.put('/:id', updateVehicleHandler);
router.delete('/:id', deleteVehicleHandler);

export default router;
