import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { AppUser } from '../models/appuser.model';
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  models: [AppUser], // Path to your models
});

export default sequelize;