import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Route } from './route.model';
import {AppUser} from "./appuser.model";

@Table({
  tableName: 'save',
  timestamps: true 
})
export class Save extends Model {
  @PrimaryKey
  @ForeignKey(() => AppUser)
  @Column
  email!: string;

  @PrimaryKey
  @ForeignKey(() => Route)
  @Column
  route_id!: string;

  @BelongsTo(() => AppUser)
  user!: AppUser;

  @BelongsTo(() => Route)
  route!: Route;


}