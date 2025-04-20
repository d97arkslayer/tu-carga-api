import TireChange from '@models/TireChange';

interface TireChangeCreateParams {
  maintenanceId: number;
  lastChangeDate: Date;
  nextChangeDate: Date;
  currentMileage?: number;
}

interface TireChangeUpdateParams {
  lastChangeDate?: Date;
  nextChangeDate?: Date;
  currentMileage?: number;
}

export class TireChangeService {
  async createTireChange(params: TireChangeCreateParams): Promise<TireChange> {
    return TireChange.create(params as any);
  }

  async findTireChangeByMaintenanceId(
    maintenanceId: number,
  ): Promise<TireChange | null> {
    return TireChange.findOne({
      where: { maintenanceId },
    });
  }

  async updateTireChange(
    maintenanceId: number,
    params: TireChangeUpdateParams,
  ): Promise<TireChange | null> {
    const tireChange = await TireChange.findOne({ where: { maintenanceId } });
    if (!tireChange) {
      return null;
    }
    await tireChange.update(params);
    return tireChange;
  }

  async deleteTireChange(maintenanceId: number): Promise<boolean> {
    const tireChange = await TireChange.findOne({ where: { maintenanceId } });
    if (!tireChange) {
      return false;
    }
    await tireChange.destroy();
    return true;
  }
}

export default new TireChangeService();
