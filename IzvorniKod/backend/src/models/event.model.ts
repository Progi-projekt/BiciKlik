import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Route } from './route.model';
import { Organizer } from './organizer.model';

@Table({
  tableName: 'event',
  timestamps: true 
})
export class Event extends Model {
  @PrimaryKey
  @Column
  event_id!: string;

  @Column
  event_time!: Date;

  @Column
  short_description!: string;
  
  @Column
  description!: string;

  @Column
  event_name!: string;

  @ForeignKey(() => Route)
  @Column
  route_id!: string;

  @ForeignKey(() => Organizer)
  @Column
  organizer_email!: string;

  @BelongsTo(() => Route)
  route!: Route;

  @BelongsTo(() => Organizer)
  organizer!: Organizer;
}