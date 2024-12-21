import express, { Application } from "express";
import path from "path";
import dotenv from "dotenv";
import sequelize from "./config/database";
import session from "express-session";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./routes/oauth.router";
import { EventRouter } from "./routes/event.router";
import { insertAppUsers } from "./config/database.insert";

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
		this.app.use("/auth", new AuthRouter().router);
		this.app.use("/event", new EventRouter().router);
		this.app.get("/api/health", (req, res) => res.json({ status: "OK" }));
		this.app.get("/db/health", (req, res) => res.json({ status: this.dbConnected ? "OK" : "ERROR" }));
	}

	private async initializeDatabase() {
		try {
			await sequelize.authenticate();
			await sequelize.sync({ force: false });
			console.log("Connected to the database");
			this.dbConnected = true;
			await this.insertInitialData();
			console.log("Initial data inserted successfully");
		} catch (error) {
			console.error("Unable to connect to the database:", error);
		}
	}

	private async insertInitialData() {
		const { insertRoutes, insertEvents, insertOrganizers, insertAppUsers } = require("./config/database.insert");
		await insertAppUsers(sequelize.getQueryInterface());
		await insertOrganizers(sequelize.getQueryInterface());
		await insertRoutes(sequelize.getQueryInterface());
		await insertEvents(sequelize.getQueryInterface());
	}
}

export default new App().app;
