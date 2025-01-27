import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Route } from './route.model';
import {AppUser} from "./appuser.model";

@Table({
  tableName: 'grade',
  timestamps: true 
})
export class Grade extends Model {
  @PrimaryKey
  @ForeignKey(() => AppUser)
  @Column
  grader_email!: string;

  @PrimaryKey
  @ForeignKey(() => Route)
  @Column
  route_id!: string;

  @Column
  grade!: number;

  @Column
  comment!: string;

  @BelongsTo(() => AppUser, 'grader_email')
  appUser!: AppUser;

  @BelongsTo(() => Route, 'route_id')
  route!: Route;
}