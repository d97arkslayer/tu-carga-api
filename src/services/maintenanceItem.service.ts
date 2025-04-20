import MaintenanceItem from '@models/MaintenanceItem';

interface MaintenanceItemCreateParams {
  maintenanceId: number;
  description: string;
  price: number;
  currentMileage?: number | null;
}

interface MaintenanceItemUpdateParams {
  description?: string;
  price?: number;
  currentMileage?: number | null;
}

export class MaintenanceItemService {
  async createMaintenanceItem(params: MaintenanceItemCreateParams): Promise<MaintenanceItem> {
    return MaintenanceItem.create(params as any);
  }

  async findMaintenanceItemById(id: number): Promise<MaintenanceItem | null> {
    return MaintenanceItem.findByPk(id);
  }

  async updateMaintenanceItem(id: number, params: MaintenanceItemUpdateParams): Promise<MaintenanceItem | null> {
    const item = await MaintenanceItem.findByPk(id);
    if (!item) {
      return null;
    }
    await item.update(params);
    return item;
  }

  async deleteMaintenanceItem(id: number): Promise<boolean> {
    const item = await MaintenanceItem.findByPk(id);
    if (!item) {
      return false;
    }
    await item.destroy();
    return true;
  }
}

export default new MaintenanceItemService();
