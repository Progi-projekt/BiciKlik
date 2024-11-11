import { Table, Column, Model, PrimaryKey, DataType, NotNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { AppUser} from './appuser.model'
@Table({
  tableName: 'Route',
  timestamps: false
})
export class Route extends Model {
	@PrimaryKey
	@Column(DataType.STRING)
	route_id!: string;

	@Column(DataType.STRING)
	route_data_path!: string | null; //points to gpx file

	@NotNull
	@Column(DataType.STRING)
	route_name!: string;

	@NotNull
	@Column(DataType.STRING)
	created_time!: Date;   //is this datetime? I think it should be 

  @NotNull
  @ForeignKey(()=>AppUser)
  @Column(DataType.STRING)
  creator_email!: string;
  @BelongsTo(()=>AppUser)
  creator!: AppUser;
}
