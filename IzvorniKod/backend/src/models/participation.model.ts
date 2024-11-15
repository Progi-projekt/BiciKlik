import { Table, Column, Model, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Regular } from './regular.model';
import { Event } from './event.model';

@Table({
  tableName: 'participation',
  timestamps: true 
})
export class Participation extends Model {
  @PrimaryKey
  @ForeignKey(() => Regular)
  @Column
  email!: string;

  @PrimaryKey
  @ForeignKey(() => Event)
  @Column
  event_id!: string;

  @Column
  achieved_result!: number;
}