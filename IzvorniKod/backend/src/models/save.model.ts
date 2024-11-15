import { Table, Column, Model, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Regular } from './regular.model';
import { Route } from './route.model';

@Table({
  tableName: 'save',
  timestamps: true 
})
export class Save extends Model {
  @PrimaryKey
  @ForeignKey(() => Regular)
  @Column
  email!: string;

  @PrimaryKey
  @ForeignKey(() => Route)
  @Column
  route_id!: string;
}