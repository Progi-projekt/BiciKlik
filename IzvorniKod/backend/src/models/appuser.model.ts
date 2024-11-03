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

	@NotNull
	@Column(DataType.STRING)
	first_name!: string;

	@NotNull
	@Column(DataType.STRING)
	family_name!: string;

	@NotNull
	@Column(DataType.DATE)
	created_time!: Date;
}
