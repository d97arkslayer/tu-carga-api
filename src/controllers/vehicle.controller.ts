// src/controllers/vehicle.controller.ts
import { Request, Response } from 'express';
import vehicleService from '@services/vehicle.service';

/**
 * Controller for vehicle-related endpoints
 */
export class VehicleController {
  /**
   * Create a new vehicle
   *
   * @param req - Express request object
   * @param res - Express response object
   */
  async createVehicle(req: Request, res: Response): Promise<void> {
    try {
      const vehicle = await vehicleService.createVehicle(req.body);
      res.status(201).json({
        success: true,
        data: vehicle,
      });
    } catch (error) {
      console.error('Error creating vehicle:', error);

      if (
        error instanceof Error &&
        error.message === 'Vehicle with this identifier already exists'
      ) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Failed to create vehicle',
      });
    }
  }

  /**
   * Get a vehicle by ID
   *
   * @param req - Express request object
   * @param res - Express response object
   */
  async getVehicleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vehicle = await vehicleService.findVehicleById(parseInt(id));

      if (!vehicle) {
        res.status(404).json({
          success: false,
          message: 'Vehicle not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: vehicle,
      });
    } catch (error) {
      console.error('Error fetching vehicle by id:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch vehicle',
      });
    }
  }

  /**
   * Get all vehicles with optional filtering
   *
   * @param req - Express request object
   * @param res - Express response object
   */
  async getAllVehicles(req: Request, res: Response): Promise<void> {
    try {
      const vehicles = await vehicleService.getAllVehicles(req.query);
      res.status(200).json({
        success: true,
        data: vehicles,
      });
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch vehicles',
      });
    }
  }

  /**
   * Update a vehicle by ID
   *
   * @param req - Express request object
   * @param res - Express response object
   */
  async updateVehicle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vehicle = await vehicleService.updateVehicle(
        parseInt(id),
        req.body,
      );

      if (!vehicle) {
        res.status(404).json({
          success: false,
          message: 'Vehicle not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: vehicle,
      });
    } catch (error) {
      console.error('Error updating vehicle:', error);

      if (
        error instanceof Error &&
        error.message === 'Vehicle with this identifier already exists'
      ) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Failed to update vehicle',
      });
    }
  }

  /**
   * Delete a vehicle by ID
   *
   * @param req - Express request object
   * @param res - Express response object
   */
  async deleteVehicle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await vehicleService.deleteVehicle(parseInt(id));

      if (!success) {
        res.status(404).json({
          success: false,
          message: 'Vehicle not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Vehicle deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete vehicle',
      });
    }
  }

  /**
   * Get vehicles by user with VehicleItems
   *
   * @param req - Express request object
   * @param res - Express response object
   */
  async getVehiclesByUser(req: Request, res: Response): Promise<void> {
    try {
      // Assuming req.user is set by auth middleware
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }
      const userId = req?.user?.id; // Assuming user ID is available in req.user
      // @ts-ignore
      const vehicles = await vehicleService.getVehiclesByUserWithItems(userId);

      res.status(200).json({
        success: true,
        data: vehicles,
      });
    } catch (error) {
      console.error('Error fetching vehicles by user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch vehicles by user',
      });
    }
  }
}

export default new VehicleController();
