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
  tableName: 'TireChanges',
  timestamps: true,
})
export default class TireChange extends Model {
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
    type: DataType.DATE,
    allowNull: false,
  })
  lastChangeDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  nextChangeDate!: Date;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  currentMileage!: number;

  // ...existing managed timestamps...
}
