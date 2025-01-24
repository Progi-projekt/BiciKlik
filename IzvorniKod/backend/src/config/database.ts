import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { AppUser } from "../models/appuser.model";
import { Organizer } from "../models/organizer.model";
import { Admin } from "../models/admin.model";
import { Message } from "../models/message.model";
import { Route } from "../models/route.model";
import { Grade } from "../models/grade.model";
import { Save } from "../models/save.model";
import { Event } from "../models/event.model";
import { Participation } from "../models/participation.model";

dotenv.config();

const sequelize = new Sequelize({
	database: process.env.DB_NAME,
	dialect: "postgres",
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	schema: "public",
	models: [AppUser, Organizer, Admin, Message, Route, Grade, Save, Event, Participation],
});

export default sequelize;
