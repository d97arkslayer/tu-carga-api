import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Vehicle from './Vehicle';

@Table({
  tableName: 'VehicleItems',
  timestamps: true,
})
export default class VehicleItem extends Model {
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

  @BelongsTo(() => Vehicle)
  vehicle!: Vehicle;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  issueDate!: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  expiryDate!: Date | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  itemIdentifier!: string | null;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  cost!: number | null;
}
