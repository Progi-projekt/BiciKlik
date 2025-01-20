import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';

export class AdminRouter {
	public router: Router;
	private adminController: AdminController;

	constructor() {
		this.router = Router();
		this.adminController = new AdminController();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/user/:email', this.adminController.getUserInfo);
		this.router.post('/user/:email/archive', this.adminController.archiveUser);
		this.router.post('/event/:eventId/delete', this.adminController.deleteEvent);
		this.router.post('/event/:eventId/leaderboard/remove/:user', this.adminController.removeEntry);
		this.router.post('/route/:routeId/delete', this.adminController.deleteRoute);

	}
}