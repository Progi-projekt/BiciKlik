import { Table, Column, Model, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Regular } from './regular.model';
import { Route } from './route.model';

@Table({
  tableName: 'grade',
  timestamps: true 
})
export class Grade extends Model {
  @PrimaryKey
  @ForeignKey(() => Regular)
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
}