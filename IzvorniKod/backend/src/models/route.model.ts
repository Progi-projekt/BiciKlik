import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo, NotNull, AllowNull, HasMany } from 'sequelize-typescript';
import { Organizer } from './organizer.model';
import { Event } from './event.model';

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

  @ForeignKey(() => Organizer)
  @Column
  creator_email!: string;

  @BelongsTo(() => Organizer)
  creator!: Organizer;

  @HasMany(() => Event)
  events_on!: Event[];

}