import { Table, Column, Model, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { AppUser } from './appuser.model';

@Table({
  tableName: 'Message',
  timestamps: true
})
export class Message extends Model {
  @PrimaryKey
  @Column
  sent_time!: Date;

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
}