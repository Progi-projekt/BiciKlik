import { Table, ForeignKey, BelongsTo, Model, Column } from 'sequelize-typescript';
import { AppUser } from './appuser.model';

@Table({
  tableName: 'regular',
  timestamps: true // Automatically adds createdAt and updatedAt fields
})
export class Regular extends Model {
  @ForeignKey(() => AppUser)
  @Column
  email!: string;

  @BelongsTo(() => AppUser)
  appUser!: AppUser;
}