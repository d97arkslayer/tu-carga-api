// src/routes/verification.routes.ts
import { Router } from 'express';
import {
  sendVerificationCode,
  verifyEmail,
} from '@controllers/verification.controller';
import { validate } from '@middlewares/validation.middleware';
import {
  verificationCodeRequestSchema,
  verifyEmailSchema,
} from '../schemas/user.schema';

const router = Router();

router.post(
  '/send-code',
  validate(verificationCodeRequestSchema),
  sendVerificationCode,
);
router.post('/verify', validate(verifyEmailSchema), verifyEmail);

export default router;
