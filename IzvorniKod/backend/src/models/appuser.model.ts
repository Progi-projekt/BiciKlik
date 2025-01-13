import {
	Table,
	Column,
	Model,
	PrimaryKey,
	DataType,
	CreatedAt,
	UpdatedAt,
	Index,
	Unique,
	HasMany
} from "sequelize-typescript";
import {Message} from "./message.model";
import {Participation} from "./participation.model";
import {Route} from "./route.model";
import {Save} from "./save.model";

@Table({
	tableName: "appuser",
	timestamps: true,
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

	@HasMany(() => Message, {foreignKey: "sender_email", as: "sent_messages"})
	sent_messages!: Message[];

	@HasMany(() => Message, {foreignKey: "sender_email", as: "received_messages"})
	received_messages!: Message[];

	@HasMany(() => Participation)
	participations!: Participation[];

	@HasMany(() => Route)
	created_routes!: Route[];

	@HasMany(() => Save)
	route_saves!: Save[];
}
