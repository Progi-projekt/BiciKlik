import { Table, ForeignKey, BelongsTo, Model, Column, PrimaryKey, HasMany, Unique } from 'sequelize-typescript';
import { AppUser } from './appuser.model';
import { Route } from './route.model';

@Table({
  tableName: 'Organizer',
  timestamps: true // Automatically adds createdAt and updatedAt fields
})
export class Organizer extends Model {
  @PrimaryKey
  @ForeignKey(() => AppUser)
  @Column
  email!: string;

  @BelongsTo(() => AppUser)
  appUser!: AppUser;

  @HasMany(() => Route)
  routes!: Route
}