import { Request, Response } from 'express';
import maintenanceService from '@services/maintenance.service';

export class MaintenanceController {
  async createMaintenance(req: Request, res: Response): Promise<void> {
    try {
      const maintenance = await maintenanceService.createMaintenance(req.body);
      res.status(201).json({
        success: true,
        data: maintenance,
      });
    } catch (error) {
      console.error('Error creating maintenance:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create maintenance',
      });
    }
  }

  async getMaintenanceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const maintenance = await maintenanceService.findMaintenanceById(
        parseInt(id),
      );
      if (!maintenance) {
        res.status(404).json({
          success: false,
          message: 'Maintenance not found',
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: maintenance,
      });
    } catch (error) {
      console.error('Error fetching maintenance by id:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch maintenance',
      });
    }
  }

  async getAllMaintenances(req: Request, res: Response): Promise<void> {
    try {
      const maintenances = await maintenanceService.getAllMaintenances(
        req.query,
      );
      res.status(200).json({
        success: true,
        data: maintenances,
      });
    } catch (error) {
      console.error('Error fetching maintenances:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch maintenances',
      });
    }
  }

  async getMaintenancesByVehicle(req: Request, res: Response): Promise<void> {
    try {
      const { vehicleId } = req.params;
      const maintenances = await maintenanceService.getAllMaintenances({
        vehicleId: parseInt(vehicleId),
      });
      res.status(200).json({
        success: true,
        data: maintenances,
      });
    } catch (error) {
      console.error('Error fetching maintenances by vehicle:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch maintenances by vehicle',
      });
    }
  }

  async updateMaintenance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const maintenance = await maintenanceService.updateMaintenance(
        parseInt(id),
        req.body,
      );
      if (!maintenance) {
        res.status(404).json({
          success: false,
          message: 'Maintenance not found',
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: maintenance,
      });
    } catch (error) {
      console.error('Error updating maintenance:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update maintenance',
      });
    }
  }

  async deleteMaintenance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await maintenanceService.deleteMaintenance(parseInt(id));
      if (!success) {
        res.status(404).json({
          success: false,
          message: 'Maintenance not found',
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Maintenance deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting maintenance:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete maintenance',
      });
    }
  }
}

export default new MaintenanceController();
