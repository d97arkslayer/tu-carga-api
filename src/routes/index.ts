import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import passwordRoutes from './password.routes';
import verificationRoutes from './verification.routes';
import vehicleRoutes from './vehicle.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/password', passwordRoutes);
router.use('/verification', verificationRoutes);
router.use('/vehicles', vehicleRoutes);

export default router;
