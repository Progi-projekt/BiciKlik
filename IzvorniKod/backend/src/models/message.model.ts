import {Table, Column, Model, PrimaryKey, ForeignKey, AutoIncrement, BelongsTo} from 'sequelize-typescript';
import { AppUser } from './appuser.model';

@Table({
  tableName: 'message',
  timestamps: true
})
export class Message extends Model {
  @PrimaryKey
  @Column
  message_index!: number;

  @PrimaryKey
  @ForeignKey(() => AppUser)
  @Column
  sender_email!: string;

  @PrimaryKey
  @ForeignKey(() => AppUser)
  @Column
  recipient_email!: string;

  @Column
  content!: string;

  @BelongsTo(() => AppUser, { foreignKey: "recipient_email", as: "recipient" })
  recipient!: AppUser;

  @BelongsTo(() => AppUser, { foreignKey: "sender_email", as: "sender" })
  sender!: AppUser;

}