import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export class UserRouter {
	public router: Router;
	private userController: UserController;

	constructor() {
		this.router = Router();
		this.userController = new UserController();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/email', this.userController.getMyEmail);
	}
}