import { Router } from "express";
import { EventController } from "../controllers/event.controller";

export class EventRouter {
	public router: Router;
	private eventController: EventController;

	constructor() {
		this.router = Router();
		this.eventController = new EventController();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post("/createEvent", this.eventController.createEvent);
		this.router.get("/getEvents", this.eventController.getEvents);
		this.router.get("/getAllEvents", this.eventController.getAllEvents);
		this.router.get("/:eventId", this.eventController.getEventById);
		this.router.get("/leaderboard/:eventId", this.eventController.getParticipants);
		this.router.post("/leaderboard/:eventId", this.eventController.addParticipant);
		this.router.post("/signup/:eventId", this.eventController.signUp);
		this.router.get("/signedUp/:eventId", this.eventController.checkSignUp);
	}
}
