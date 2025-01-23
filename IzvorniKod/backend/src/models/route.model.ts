import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo, NotNull, AllowNull, HasMany } from 'sequelize-typescript';
import { Event } from './event.model';
import {AppUser} from "./appuser.model";
import { Grade } from './grade.model';

@Table({
  tableName: 'route',
  timestamps: true 
})
export class Route extends Model {
  @PrimaryKey
  @Column
  route_id!: string;

  @Column
  route_name!: string;

  @Column
  route_data_path_gpx!: string;  

  @ForeignKey(() => AppUser)
  @Column
  creator_email!: string;

  @BelongsTo(() => AppUser)
  creator!: AppUser;

  @HasMany(() => Event)
  events_on!: Event[];

  @HasMany(() => Grade)
  reviews!: Grade[];

}