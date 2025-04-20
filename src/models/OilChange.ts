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
  tableName: 'OilChanges',
  timestamps: true,
})
export default class OilChange extends Model {
  @ForeignKey(() => Maintenance)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  maintenanceId!: number;

  @BelongsTo(() => Maintenance)
  maintenance!: Maintenance;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  currentMileage!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  nextMileage!: number;

  // ...existing managed timestamps...
}
