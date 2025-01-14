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

	@HasMany(() => Message, { as: "sentMessages", foreignKey: "sender_email" })
	sentMessages!: Message[];

	@HasMany(() => Message, { as: "receivedMessages", foreignKey: "recipient_email" })
	receivedMessages!: Message[];
}
