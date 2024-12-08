import { Router } from 'express';
import {
  getVehicles,
  createVehicleHandler,
  getVehicleHandler,
  updateVehicleHandler,
  deleteVehicleHandler,
} from '@controllers/vehicle.controller';

const router = Router();

router.get('/', getVehicles);
router.post('/', createVehicleHandler);
router.get('/:id', getVehicleHandler);
router.put('/:id', updateVehicleHandler);
router.delete('/:id', deleteVehicleHandler);

export default router;
