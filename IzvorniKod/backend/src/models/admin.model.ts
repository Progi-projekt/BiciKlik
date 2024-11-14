import { Table, ForeignKey, BelongsTo, Model, Column, PrimaryKey } from 'sequelize-typescript';
import { AppUser } from './appuser.model';

@Table({
  tableName: 'Admin',
  timestamps: true // Automatically adds createdAt and updatedAt fields
})
export class Admin extends Model {
  @PrimaryKey
  @ForeignKey(() => AppUser)
  @Column
  email!: string;

  @BelongsTo(() => AppUser)
  appUser!: AppUser;
}