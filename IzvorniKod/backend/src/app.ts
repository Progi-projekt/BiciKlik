import express, { Application } from "express";
import path from "path";
import dotenv from "dotenv";
import sequelize from "./config/database";
import session from "express-session";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./routes/oauth.router";
import { EventRouter } from "./routes/event.router";
import { MapRouter } from "./routes/map.router";
import { RouteRouter } from "./routes/route.router";
import { insertAppUsers } from "./config/database.insert";
import {ChatRouter} from "./routes/chat.router";

dotenv.config();

class App {
	public app: Application;
	private dbConnected: boolean = false;

	constructor() {
		this.app = express();
		this.initializeMiddlewares();
		this.initializeRoutes();
		this.initializeDatabase();
	}

	private initializeMiddlewares() {
		this.app.use(express.json());
		this.app.use(cookieParser());
		this.app.use(
			session({
				secret: process.env.SESSION_SECRET || "your_secret_key",
				resave: false,
				saveUninitialized: true,
				cookie: { secure: false },
			})
		);
		this.app.use(express.static(path.join(__dirname, "../../frontend/dist")));
		this.app.use("/images", express.static(path.join(__dirname, "../../static/images")));
	}

	private initializeRoutes() {
		this.app.use("/api/auth", new AuthRouter().router);
		this.app.use("/api/event", new EventRouter().router);
		this.app.use("/api/chat", new ChatRouter().router);
		this.app.use("/api/map", new MapRouter().router);
		this.app.get("/api/health", (req, res) => res.json({ status: "OK" }));
		this.app.get("/db/health", (req, res) => res.json({ status: this.dbConnected ? "OK" : "ERROR" }));
		this.app.get("/api/env", (req, res) => res.json({ mapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }));
		this.app.use("/api/route", new RouteRouter().router);

		this.app.get("*", (req, res) => {
			res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
		});
	}

	private async initializeDatabase() {
		try {
			await sequelize.authenticate();
			console.log("Connected to the database");

			if (!this.dbConnected) {
				//sync only once
				await sequelize.sync({ force: false });
				console.log("All models were synchronized successfully.");
				this.dbConnected = true;
				/* await this.insertInitialData();
				console.log("Initial data inserted successfully"); */
			}
		} catch (error) {
			console.error("Unable to connect to the database:", error);
		}
	}

	private async insertInitialData() {
		//func 4 inserting initial data
		const {
			insertRoutes,
			insertEvents,
			insertOrganizers,
			insertRegulars,
			insertAppUsers,
		} = require("./config/database.insert");
		await insertAppUsers(sequelize.getQueryInterface());
		await insertRegulars(sequelize.getQueryInterface());
		await insertOrganizers(sequelize.getQueryInterface());
		await insertRoutes(sequelize.getQueryInterface());
		await insertEvents(sequelize.getQueryInterface());
	}
}

export default new App().app;
