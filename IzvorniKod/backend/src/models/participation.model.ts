import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Event } from './event.model';
import {AppUser} from "./appuser.model";

@Table({
  tableName: 'participation',
  timestamps: true 
})
export class Participation extends Model {
  @PrimaryKey
  @ForeignKey(() => AppUser)
  @Column
  email!: string;

  @PrimaryKey
  @ForeignKey(() => Event)
  @Column
  event_id!: string;

  @Column
  achieved_result!: number;

  @BelongsTo(() => AppUser)
  user!: AppUser;

  @BelongsTo(() => Event)
  event!: Event;

}