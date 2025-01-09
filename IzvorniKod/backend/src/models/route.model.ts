import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo, NotNull, AllowNull, HasMany } from 'sequelize-typescript';
import { Regular } from './regular.model';
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

  @ForeignKey(() => Regular)
  @Column
  creator_email!: string;

  @BelongsTo(() => Regular)
  creator!: Regular;

  @HasMany(() => Event)
  events_on!: Event[];

}