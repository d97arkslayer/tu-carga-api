import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class Vehicle extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  make!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year!: number;
}
