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
		this.router.post('/createEvent', this.eventController.createEvent);
		this.router.get('/getEvents', this.eventController.getEvents);
		this.router.get('/getAllEvents', this.eventController.getAllEvents);
		this.router.get('/:eventId', this.eventController.getEventById);
		this.router.get('/:eventId/organizer', this.eventController.getOrganizer);
		this.router.get('/:eventId/leaderboard', this.eventController.getParticipants);
		this.router.get('/:eventId/signedup', this.eventController.checkSignUp);
		this.router.post('/:eventId/signup', this.eventController.signUp);
		this.router.post('/:eventId/signout', this.eventController.signOut);
		this.router.post('/:eventId/leaderboard', this.eventController.saveResult);
	}
}

