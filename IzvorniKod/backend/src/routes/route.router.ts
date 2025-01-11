import { Router } from 'express';
import { RouteController } from '../controllers/route.controller';

export class RouteRouter {
  public router: Router;
  private eventController: RouteController;

  constructor() {
	this.router = Router();
	this.eventController = new RouteController();
	this.initializeRoutes();
  }

  private initializeRoutes() {
	this.router.post('/review/:routeId', this.eventController.addReview); //reviews are route-specific
  }
}