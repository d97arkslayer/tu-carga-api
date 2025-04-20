import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import Vehicle from './Vehicle';
import OilChange from './OilChange';
import TireChange from './TireChange';
import MaintenanceItem from './MaintenanceItem';

@Table({
  tableName: 'Maintenances',
  timestamps: true,
})
export default class Maintenance extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Vehicle)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  vehicleId!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  serviceCenter: string;

  @BelongsTo(() => Vehicle)
  vehicle!: Vehicle;

  @HasOne(() => OilChange)
  oilChange!: OilChange;

  @HasOne(() => TireChange)
  tireChange!: TireChange;

  @HasMany(() => MaintenanceItem)
  maintenanceItems!: MaintenanceItem[];

  // ...other maintenance fields if needed...
}
