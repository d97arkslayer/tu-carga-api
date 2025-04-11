import { Router } from 'express';
import userItemController from '@controllers/userItem.controller';
import { validate } from '@middlewares/validation.middleware';
import { authenticate } from '@middlewares/auth.middleware';
import {
  createUserItemSchema,
  updateUserItemSchema,
} from '@schemas/userItem.schema';

const router = Router();

// All routes protected
router.use(authenticate);
router.get('/', userItemController.getAllUserItems);
router.get('/user/:userId', userItemController.getUserItemsByUser);

router.post(
  '/',
  validate(createUserItemSchema),
  userItemController.createUserItem,
);
router.get('/:id', userItemController.getUserItemById);
router.put(
  '/:id',
  validate(updateUserItemSchema),
  userItemController.updateUserItem,
);

router.delete(
  '/:id',
  userItemController.deleteUserItem,
  // Route to list user items by user id
);

export default router;
