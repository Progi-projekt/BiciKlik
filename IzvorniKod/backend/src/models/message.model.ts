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

  @BelongsTo(() => AppUser, "recipient_email")
  recipient!: AppUser;

  @BelongsTo(() => AppUser, "sender_email")
  sender!: AppUser;

}