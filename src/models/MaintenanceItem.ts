import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Maintenance from './Maintenance';

@Table({
  tableName: 'MaintenanceItems',
  timestamps: true,
})
export default class MaintenanceItem extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Maintenance)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maintenanceId!: number;

  @BelongsTo(() => Maintenance)
  maintenance!: Maintenance;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  currentMileage!: number | null;

  // ...existing managed timestamps...
}
