import { Router } from "express";
import { RouteController } from "../controllers/route.controller";

export class RouteRouter {
	public router: Router;
	private routeController: RouteController;

	constructor() {
		this.router = Router();
		this.routeController = new RouteController();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get("/myRoutes", this.routeController.myRoutes);
		this.router.get("/getAllRoutes", this.routeController.getAllRoutes);
		this.router.get("/:routeId/saved", this.routeController.saved);
		this.router.get("/:routeId/reviews", this.routeController.getRecentReviews);
		this.router.get("/:routeId/average", this.routeController.getAverageGrade);
		this.router.post("/:routeId/review", this.routeController.addReview); //reviews are route-specific
		this.router.post("/:routeId/save", this.routeController.saveRoute);
		this.router.post("/:routeId/unsave", this.routeController.unsaveRoute);
	}
}
