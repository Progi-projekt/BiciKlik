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
		this.router.get('/userinfo/:email', this.adminController.getUserInfo);
		this.router.post('/archive/:email', this.adminController.archiveUser);

	}
}