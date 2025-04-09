// src/services/vehicle.service.ts
import Vehicle from '@models/Vehicle';
import { Op } from 'sequelize';
import User from '@models/User';

interface VehicleCreateParams {
  plate: string;
  dniOwner: string;
  userId?: number;
  make: string;
  year: number;
  dniOwnerType: string;
  vehicleType: 'car' | 'truck' | 'motorcycle';
  line: string;
  engineDisplacement: number;
  serviceType: 'private' | 'public';
  engineId?: string;
  VIN?: string;
  chassisId?: string;
  color: string;
  passengerCapacity: number;
  fuelType: 'gasolina' | 'gas' | 'diesel';
  registrationDate: Date;
  from: string;
}

interface VehicleUpdateParams {
  plate?: string;
  dniOwner?: string;
  dniOwnerType?: string;
  userId?: number;
  make?: string;
  year?: number;
  vehicleType?: 'car' | 'truck' | 'motorcycle';
  line?: string;
  engineDisplacement?: number;
  serviceType?: 'private' | 'public';
  engineId?: string;
  VIN?: string;
  chassisId?: string;
  color?: string;
  passengerCapacity?: number;
  fuelType?: 'gasolina' | 'gas' | 'diesel';
  registrationDate?: Date;
  from?: string;
}

interface VehicleFilterParams {
  plate?: string;
  dniOwner?: string;
  vehicleType?: 'car' | 'truck' | 'motorcycle';
  serviceType?: 'private' | 'public';
  fuelType?: 'gasolina' | 'gas' | 'diesel';
  userId?: number;
}

/**
 * Service class for handling vehicle-related operations
 */
export class VehicleService {
  /**
   * Create a new vehicle
   *
   * @param params - Vehicle creation parameters
   * @returns The created vehicle instance
   */
  async createVehicle(params: VehicleCreateParams): Promise<Vehicle> {
    if (params.userId) {
      const user = await User.findByPk(params.userId);
      if (!user) {
        throw new Error('User not found');
      }
    }
    // Check if the plate already exists
    const existingVehicle = await Vehicle.findOne({
      where: { plate: params.plate },
    });

    if (existingVehicle) {
      throw new Error('Vehicle with this plate already exists');
    }

    return Vehicle.create(params as any);
  }

  /**
   * Find a vehicle by ID
   *
   * @param id - Vehicle ID to find
   * @returns The found vehicle or null if not found
   */
  async findVehicleById(id: number): Promise<Vehicle | null> {
    return Vehicle.findByPk(id);
  }

  /**
   * Find a vehicle by plate (plate number)
   *
   * @param plate - Vehicle plate to find
   * @returns The found vehicle or null if not found
   */
  async findVehicleByplate(plate: string): Promise<Vehicle | null> {
    return Vehicle.findOne({
      where: { plate },
    });
  }

  /**
   * Get all vehicles with optional filtering
   *
   * @param filters - Optional filter parameters
   * @returns Array of vehicles matching the filters
   */
  async getAllVehicles(filters?: VehicleFilterParams): Promise<Vehicle[]> {
    const whereClause: any = {};

    if (filters) {
      if (filters.plate) {
        whereClause.plate = { [Op.like]: `%${filters.plate}%` };
      }

      if (filters.dniOwner) {
        whereClause.dniOwner = { [Op.like]: `%${filters.dniOwner}%` };
      }

      if (filters.vehicleType) {
        whereClause.vehicleType = filters.vehicleType;
      }

      if (filters.serviceType) {
        whereClause.serviceType = filters.serviceType;
      }

      if (filters.fuelType) {
        whereClause.fuelType = filters.fuelType;
      }
    }

    return Vehicle.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Update a vehicle by ID
   *
   * @param id - Vehicle ID to update
   * @param params - Vehicle update parameters
   * @returns The updated vehicle or null if not found
   */
  async updateVehicle(
    id: number,
    params: VehicleUpdateParams,
  ): Promise<Vehicle | null> {
    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      return null;
    }

    // If plate is being updated, check it doesn't conflict
    if (params.plate && params.plate !== vehicle.plate) {
      const existingVehicle = await Vehicle.findOne({
        where: { plate: params.plate },
      });

      if (existingVehicle) {
        throw new Error('Vehicle with this plate already exists');
      }
    }

    await vehicle.update(params);
    return vehicle;
  }

  /**
   * Delete a vehicle by ID
   *
   * @param id - Vehicle ID to delete
   * @returns True if successful, false if vehicle not found
   */
  async deleteVehicle(id: number): Promise<boolean> {
    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      return false;
    }

    await vehicle.destroy();
    return true;
  }

  // Add method to get vehicles by user
  async getVehiclesByUser(userId: number): Promise<Vehicle[]> {
    return Vehicle.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new VehicleService();
