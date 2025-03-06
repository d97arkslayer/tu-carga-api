// src/routes/user.routes.ts
import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '@controllers/user.controller';
import { validate } from '@schemas/validation.middleware';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

const router = Router();

router.post('/', validate(createUserSchema), createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
