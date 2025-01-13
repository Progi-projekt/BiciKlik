import { Router } from 'express';
import { RouteController } from '../controllers/route.controller';

export class RouteRouter {
  public router: Router;
  private routeController: RouteController;

  constructor() {
	this.router = Router();
	this.routeController = new RouteController();
	this.initializeRoutes();
  }

  private initializeRoutes() {
	this.router.post('/review/:routeId', this.routeController.addReview); //reviews are route-specific
  }
}