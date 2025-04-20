import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import passwordRoutes from './password.routes';
import verificationRoutes from './verification.routes';
import vehicleRoutes from './vehicle.routes';
import vehicleItemsRoutes from './vehicleItem.routes';
import userItemRoutes from './userItem.routes';
import maintenanceRoutes from './maintenance.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/password', passwordRoutes);
router.use('/verification', verificationRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/vehicle-items', vehicleItemsRoutes);
router.use('/user-items', userItemRoutes);
router.use('/maintenances', maintenanceRoutes);

export default router;
