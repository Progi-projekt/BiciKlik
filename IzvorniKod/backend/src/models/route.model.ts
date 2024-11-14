import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo, NotNull, AllowNull } from 'sequelize-typescript';
import { Organizer } from './organizer.model';

@Table({
  tableName: 'Route',
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

  @Column
  created_time!: Date;

  @ForeignKey(() => Organizer)
  @Column
  creator_email!: string;

  @BelongsTo(() => Organizer)
  creator!: Organizer;

}