// src/models/Vehicle.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './User';

@Table({
  tableName: 'Vehicles',
  timestamps: true,
})
export default class Vehicle extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  plate!: string;

  @Column({ type: DataType.STRING, allowNull: false }) make!: string;

  @Column({ type: DataType.INTEGER, allowNull: false }) year!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dniOwner!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dniOwnerType!: string;

  @Column({
    type: DataType.ENUM('car', 'truck', 'motorcycle'),
    allowNull: false,
  })
  vehicleType!: 'car' | 'truck' | 'motorcycle';

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  line!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  engineDisplacement!: number;

  @Column({
    type: DataType.ENUM('private', 'public'),
    allowNull: false,
  })
  serviceType!: 'private' | 'public';

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  engineId!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  VIN!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  chassisId!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  passengerCapacity!: number;

  @Column({
    type: DataType.ENUM('gasolina', 'gas', 'diesel'),
    allowNull: false,
  })
  fuelType!: 'gasolina' | 'gas' | 'diesel';

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  registrationDate!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  from!: string;
}
