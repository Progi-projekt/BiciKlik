import { Table, ForeignKey, PrimaryKey, BelongsTo, Model, Column, HasMany } from 'sequelize-typescript';
import { AppUser } from './appuser.model';
import { Participation } from './participation.model';
import { Route } from './route.model';

@Table({
  tableName: 'regular',
  timestamps: true // Automatically adds createdAt and updatedAt fields
})
export class Regular extends Model {
  @PrimaryKey
  @ForeignKey(() => AppUser)
  @Column
  email!: string;

  @BelongsTo(() => AppUser)
  appUser!: AppUser;

  @HasMany(() => Participation)
  participations!: Participation[];

  @HasMany(() => Route)
  owned_routes!: Route;
}