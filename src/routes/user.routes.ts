// src/routes/user.routes.ts
import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCurrentUser,
} from '@controllers/user.controller';
import { validate } from '@middlewares//validation.middleware';
import { createUserSchema, updateUserSchema } from '@schemas/user.schema';
import { authenticate } from '@middlewares/auth.middleware';

const router = Router();

router.post('/', validate(createUserSchema), createUser);
router.get('/', getAllUsers);
router.get('/me', authenticate, getCurrentUser);
router.get('/:id', getUserById);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
