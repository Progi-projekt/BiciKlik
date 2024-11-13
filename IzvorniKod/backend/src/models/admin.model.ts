import { Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Organizer } from './organizer.model';

@Table({
  tableName: 'Admin',
  timestamps: true // Automatically adds createdAt and updatedAt fields
})
export class Admin extends Model {
  @ForeignKey(() => Organizer)
  @Column
  email!: string;

  @BelongsTo(() => Organizer)
  organizer!: Organizer;
}