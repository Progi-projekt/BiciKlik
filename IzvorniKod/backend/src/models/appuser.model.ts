import { Table, Column, Model, PrimaryKey, DataType, NotNull } from 'sequelize-typescript';

@Table({
  tableName: 'AppUser',
  timestamps: false
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

	@NotNull
	@Column(DataType.DATE)
	created_time!: Date;
}
