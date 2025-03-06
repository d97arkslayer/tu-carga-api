// src/routes/password.routes.ts
import { Router } from 'express';
import {
  requestPasswordReset,
  resetPassword,
} from '@controllers/password.controller';
import { validate } from '@middlewares/validation.middleware';
import {
  requestPasswordResetSchema,
  resetPasswordSchema,
} from '../schemas/user.schema';

const router = Router();

router.post(
  '/forgot-password',
  validate(requestPasswordResetSchema),
  requestPasswordReset,
);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

export default router;
