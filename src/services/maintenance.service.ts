import Maintenance from '@models/Maintenance';
import OilChange from '@models/OilChange';
import TireChange from '@models/TireChange';
import MaintenanceItem from '@models/MaintenanceItem';

interface MaintenanceCreateParams {
  vehicleId: number;
  price: number;
  type: string;
  serviceCenter: string;
  oilChange?: {
    currentMileage: number;
    nextMileage: number;
  };
  tireChange?: {
    lastChangeDate: Date;
    nextChangeDate: Date;
    currentMileage?: number;
  };
  maintenanceItems?: Array<{
    description: string;
    price: number;
    currentMileage?: number;
  }>;
}

interface MaintenanceUpdateParams {
  vehicleId?: number;
  price?: number;
  type?: string;
  serviceCenter?: string;
  oilChange?: {
    currentMileage: number;
    nextMileage: number;
  };
  tireChange?: {
    lastChangeDate: Date;
    nextChangeDate: Date;
    currentMileage?: number;
  };
  maintenanceItems?: Array<{
    description: string;
    price: number;
    currentMileage?: number;
  }>;
}

class MaintenanceService {
  // Create a new maintenance and associated operations
  async createMaintenance(
    params: MaintenanceCreateParams,
  ): Promise<Maintenance> {
    // Create the main maintenance record
    const maintenance = await Maintenance.create({
      vehicleId: params.vehicleId,
      price: params.price,
      type: params.type,
      serviceCenter: params.serviceCenter,
    });

    // Create associated OilChange if provided
    if (params.oilChange) {
      await OilChange.create({
        maintenanceId: maintenance.id,
        currentMileage: params.oilChange.currentMileage,
        nextMileage: params.oilChange.nextMileage,
      });
    }

    // Create associated TireChange if provided
    if (params.tireChange) {
      await TireChange.create({
        maintenanceId: maintenance.id,
        lastChangeDate: params.tireChange.lastChangeDate,
        nextChangeDate: params.tireChange.nextChangeDate,
        currentMileage: params.tireChange.currentMileage || null,
      });
    }

    // Create associated MaintenanceItems if provided
    if (params.maintenanceItems && params.maintenanceItems.length) {
      for (const item of params.maintenanceItems) {
        await MaintenanceItem.create({
          maintenanceId: maintenance.id,
          description: item.description,
          price: item.price,
          currentMileage: item.currentMileage || null,
        });
      }
    }
    return maintenance;
  }

  // Find a maintenance by ID with its associations
  async findMaintenanceById(id: number): Promise<Maintenance | null> {
    return Maintenance.findByPk(id, {
      include: [OilChange, TireChange, MaintenanceItem],
    });
  }

  // Update a maintenance and its associated records if provided
  async updateMaintenance(
    id: number,
    params: MaintenanceUpdateParams,
  ): Promise<Maintenance | null> {
    const maintenance = await Maintenance.findByPk(id);
    if (!maintenance) return null;

    // Update main maintenance fields
    await maintenance.update({
      vehicleId:
        params.vehicleId !== undefined
          ? params.vehicleId
          : maintenance.vehicleId,
      price: params.price !== undefined ? params.price : maintenance.price,
      type: params.type !== undefined ? params.type : maintenance.type,
      serviceCenter:
        params.serviceCenter !== undefined
          ? params.serviceCenter
          : maintenance.serviceCenter,
    });

    // Update or create OilChange if provided
    if (params.oilChange) {
      const oilChange = await OilChange.findOne({
        where: { maintenanceId: id },
      });
      if (oilChange) {
        await oilChange.update({
          currentMileage: params.oilChange.currentMileage,
          nextMileage: params.oilChange.nextMileage,
        });
      } else {
        await OilChange.create({
          maintenanceId: id,
          currentMileage: params.oilChange.currentMileage,
          nextMileage: params.oilChange.nextMileage,
        });
      }
    }

    // Update or create TireChange if provided
    if (params.tireChange) {
      const tireChange = await TireChange.findOne({
        where: { maintenanceId: id },
      });
      if (tireChange) {
        await tireChange.update({
          lastChangeDate: params.tireChange.lastChangeDate,
          nextChangeDate: params.tireChange.nextChangeDate,
        });
      } else {
        await TireChange.create({
          maintenanceId: id,
          lastChangeDate: params.tireChange.lastChangeDate,
          nextChangeDate: params.tireChange.nextChangeDate,
        });
      }
    }

    // Replace MaintenanceItems if provided
    if (params.maintenanceItems) {
      // Remove old items
      await MaintenanceItem.destroy({ where: { maintenanceId: id } });
      // Create new ones
      for (const item of params.maintenanceItems) {
        await MaintenanceItem.create({
          maintenanceId: id,
          description: item.description,
          price: item.price,
          currentMileage: item.currentMileage || null,
        });
      }
    }
    return maintenance;
  }

  // Delete a maintenance and its associations
  async deleteMaintenance(id: number): Promise<boolean> {
    const maintenance = await Maintenance.findByPk(id);
    if (!maintenance) return false;

    // Delete associated records
    await OilChange.destroy({ where: { maintenanceId: id } });
    await TireChange.destroy({ where: { maintenanceId: id } });
    await MaintenanceItem.destroy({ where: { maintenanceId: id } });
    await maintenance.destroy();
    return true;
  }

  // Get all maintenances with optional filtering
  async getAllMaintenances(filters?: {
    vehicleId?: number;
  }): Promise<Maintenance[]> {
    const whereClause: any = {};
    if (filters?.vehicleId) {
      whereClause.vehicleId = filters.vehicleId;
    }
    return Maintenance.findAll({
      where: whereClause,
      include: [OilChange, TireChange, MaintenanceItem],
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new MaintenanceService();
