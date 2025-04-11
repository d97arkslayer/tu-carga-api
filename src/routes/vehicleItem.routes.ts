import { Router } from 'express';
import vehicleItemController from '@controllers/vehicleItem.controller';
import { validate } from '@middlewares/validation.middleware';
import { authenticate } from '@middlewares/auth.middleware';
import {
  createVehicleItemSchema,
  updateVehicleItemSchema,
  vehicleByIdParamsSchema,
} from '@schemas/vehicleItem.schema';

const router = Router();

// All routes protected
router.use(authenticate);

router.get('/', vehicleItemController.getAllVehicleItems);

router.get('/:id', vehicleItemController.getVehicleItemById);

router.post(
  '/',
  validate(createVehicleItemSchema),
  vehicleItemController.createVehicleItem,
);

router.put(
  '/:id',
  validate(updateVehicleItemSchema),
  vehicleItemController.updateVehicleItem,
);

router.delete('/:id', vehicleItemController.deleteVehicleItem);

// Route to list vehicle items by vehicle id
router.get(
  '/vehicle/:vehicleId',
  validate(vehicleByIdParamsSchema),
  vehicleItemController.getVehicleItemsByVehicle,
);

export default router;
