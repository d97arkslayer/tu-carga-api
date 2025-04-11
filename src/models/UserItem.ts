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
  tableName: 'UserItems',
  timestamps: true,
})
export default class UserItem extends Model {
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
  })
  category!: string;

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
    type: DataType.STRING,
    allowNull: false,
  })
  vehicleType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  licenseCategory!: string;
}
