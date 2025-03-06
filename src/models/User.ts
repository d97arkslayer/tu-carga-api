// src/models/User.ts
import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';

@Table({
  tableName: 'Users',
  timestamps: true,
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  resetPasswordToken!: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  resetPasswordExpires!: Date | null;

  @Column({
    type: DataType.STRING(6),
    allowNull: true,
  })
  verificationCode!: string | null;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isVerified!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  verificationCodeExpires!: Date | null;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      instance.password = await bcrypt.hash(instance.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
