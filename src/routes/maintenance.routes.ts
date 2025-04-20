import { Router } from 'express';
import maintenanceController from '@controllers/maintenance.controller';
import { validate } from '@middlewares/validation.middleware';
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
} from '@schemas/maintenance.schema';
// ...existing middlewares if any, e.g. validate, authenticate...

const router = Router();

router.get('/', maintenanceController.getAllMaintenances);
router.post(
  '/',
  validate(createMaintenanceSchema),
  maintenanceController.createMaintenance,
);
router.get('/:id', maintenanceController.getMaintenanceById);
router.get(
  '/vehicle/:vehicleId',
  maintenanceController.getMaintenancesByVehicle,
);
router.put(
  '/:id',
  validate(updateMaintenanceSchema),
  maintenanceController.updateMaintenance,
);
router.delete('/:id', maintenanceController.deleteMaintenance);

export default router;
