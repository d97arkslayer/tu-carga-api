import { Request, Response } from 'express';
import userItemService from '@services/userItem.service';

export class UserItemController {
  async createUserItem(req: Request, res: Response): Promise<void> {
    try {
      // New fields: vehicleType, licenseCategory are expected in req.body
      const item = await userItemService.createUserItem(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      console.error('Error creating user item:', error);
      res.status(500).json({ success: false, message: 'Failed to create user item' });
    }
  }

  async getUserItemById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await userItemService.findUserItemById(parseInt(id));
      if (!item) {
        res.status(404).json({ success: false, message: 'UserItem not found' });
        return;
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      console.error('Error fetching user item by id:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch user item' });
    }
  }

  async getAllUserItems(req: Request, res: Response): Promise<void> {
    try {
      const items = await userItemService.getAllUserItems();
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error('Error fetching user items:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch user items' });
    }
  }

  async updateUserItem(req: Request, res: Response): Promise<void> {
    try {
      // New fields: vehicleType, licenseCategory are expected in req.body if provided
      const { id } = req.params;
      const item = await userItemService.updateUserItem(parseInt(id), req.body);
      if (!item) {
        res.status(404).json({ success: false, message: 'UserItem not found' });
        return;
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      console.error('Error updating user item:', error);
      res.status(500).json({ success: false, message: 'Failed to update user item' });
    }
  }

  async deleteUserItem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await userItemService.deleteUserItem(parseInt(id));
      if (!success) {
        res.status(404).json({ success: false, message: 'UserItem not found' });
        return;
      }
      res.status(200).json({ success: true, message: 'UserItem deleted successfully' });
    } catch (error) {
      console.error('Error deleting user item:', error);
      res.status(500).json({ success: false, message: 'Failed to delete user item' });
    }
  }

  async getUserItemsByUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const items = await userItemService.getUserItemsByUser(parseInt(userId));
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error('Error fetching user items by user id:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch user items' });
    }
  }
}

export default new UserItemController();
