import VehicleItem from '@models/VehicleItem';

class VehicleItemService {
  async createVehicleItem(params: Partial<VehicleItem>): Promise<VehicleItem> {
    return VehicleItem.create(params);
  }

  async findVehicleItemById(id: number): Promise<VehicleItem | null> {
    return VehicleItem.findByPk(id);
  }

  async getAllVehicleItems(): Promise<VehicleItem[]> {
    return VehicleItem.findAll({ order: [['createdAt', 'DESC']] });
  }

  async updateVehicleItem(id: number, params: Partial<VehicleItem>): Promise<VehicleItem | null> {
    const item = await VehicleItem.findByPk(id);
    if (!item) return null;
    await item.update(params);
    return item;
  }

  async deleteVehicleItem(id: number): Promise<boolean> {
    const item = await VehicleItem.findByPk(id);
    if (!item) return false;
    await item.destroy();
    return true;
  }

  async getVehicleItemsByVehicle(vehicleId: number): Promise<VehicleItem[]> {
    return VehicleItem.findAll({
      where: { vehicleId },
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new VehicleItemService();
