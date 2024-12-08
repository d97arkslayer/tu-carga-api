import { Router } from 'express';
import vehicleRoutes from './vehicle.routes';

const router = Router();

router.use('/vehicles', vehicleRoutes);

export default router;
