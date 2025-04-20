import OilChange from '@models/OilChange';

interface OilChangeCreateParams {
  maintenanceId: number;
  currentMileage: number;
  nextMileage: number;
}

interface OilChangeUpdateParams {
  currentMileage?: number;
  nextMileage?: number;
}

export class OilChangeService {
  async createOilChange(params: OilChangeCreateParams): Promise<OilChange> {
    return OilChange.create(params as any);
  }

  async findOilChangeByMaintenanceId(
    maintenanceId: number,
  ): Promise<OilChange | null> {
    return OilChange.findOne({
      where: { maintenanceId },
    });
  }

  async updateOilChange(
    maintenanceId: number,
    params: OilChangeUpdateParams,
  ): Promise<OilChange | null> {
    const oilChange = await OilChange.findOne({ where: { maintenanceId } });
    if (!oilChange) {
      return null;
    }
    await oilChange.update(params);
    return oilChange;
  }

  async deleteOilChange(maintenanceId: number): Promise<boolean> {
    const oilChange = await OilChange.findOne({ where: { maintenanceId } });
    if (!oilChange) {
      return false;
    }
    await oilChange.destroy();
    return true;
  }
}

export default new OilChangeService();
