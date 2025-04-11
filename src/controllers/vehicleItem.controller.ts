import { Request, Response } from 'express';
import vehicleItemService from '@services/vehicleItem.service';

export class VehicleItemController {
  async createVehicleItem(req: Request, res: Response): Promise<void> {
    try {
      const item = await vehicleItemService.createVehicleItem(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      console.error('Error creating vehicle item:', error);
      res.status(500).json({ success: false, message: 'Failed to create vehicle item' });
    }
  }

  async getVehicleItemById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await vehicleItemService.findVehicleItemById(parseInt(id));
      if (!item) {
        res.status(404).json({ success: false, message: 'VehicleItem not found' });
        return;
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      console.error('Error fetching vehicle item by id:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch vehicle item' });
    }
  }

  async getAllVehicleItems(req: Request, res: Response): Promise<void> {
    try {
      const items = await vehicleItemService.getAllVehicleItems();
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error('Error fetching vehicle items:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch vehicle items' });
    }
  }

  async updateVehicleItem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await vehicleItemService.updateVehicleItem(parseInt(id), req.body);
      if (!item) {
        res.status(404).json({ success: false, message: 'VehicleItem not found' });
        return;
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      console.error('Error updating vehicle item:', error);
      res.status(500).json({ success: false, message: 'Failed to update vehicle item' });
    }
  }

  async deleteVehicleItem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await vehicleItemService.deleteVehicleItem(parseInt(id));
      if (!success) {
        res.status(404).json({ success: false, message: 'VehicleItem not found' });
        return;
      }
      res.status(200).json({ success: true, message: 'VehicleItem deleted successfully' });
    } catch (error) {
      console.error('Error deleting vehicle item:', error);
      res.status(500).json({ success: false, message: 'Failed to delete vehicle item' });
    }
  }

  async getVehicleItemsByVehicle(req: Request, res: Response): Promise<void> {
    try {
      const { vehicleId } = req.params;
      const items = await vehicleItemService.getVehicleItemsByVehicle(parseInt(vehicleId));
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error('Error fetching vehicle items by vehicle id:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch vehicle items' });
    }
  }
}

export default new VehicleItemController();
