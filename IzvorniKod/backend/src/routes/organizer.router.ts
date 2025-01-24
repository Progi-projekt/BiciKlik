import { Router } from 'express';
import { OrganizerController } from '../controllers/organizer.controller';

export class OrganizerRouter {
	public router: Router;
	private organizerController: OrganizerController;

	constructor() {
		this.router = Router();
		this.organizerController = new OrganizerController();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/event/:eventId/delete', this.organizerController.deleteEvent);
	}
}