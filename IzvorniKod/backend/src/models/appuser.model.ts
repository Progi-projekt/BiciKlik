import { Table, Column, Model, PrimaryKey, DataType, CreatedAt, UpdatedAt, Index, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'appuser',
  timestamps: true 
})
export class AppUser extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  archived_reason!: string | null;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  oauthProvider!: string;

  @Column(DataType.STRING)
  oauthId!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
