import { Router } from 'express';
import vehicleRoutes from './vehicle.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import passwordRoutes from './password.routes';
import verificationRoutes from './verification.routes';

const router = Router();

router.use('/vehicles', vehicleRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/password', passwordRoutes);
router.use('/verification', verificationRoutes);

export default router;
