import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'vehicles',
  timestamps: true,
})
export class Vehicle extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year!: number;
}

export default Vehicle;
