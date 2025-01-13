// backend/src/routes/mapRouter.ts
import { Router } from "express";
import { MapController } from "../controllers/map.controller";

export class MapRouter {
	public router: Router;
	private mapController: MapController;

	constructor() {
		this.router = Router();
		this.mapController = new MapController();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post("/save-route-image", this.mapController.saveRoute);
		this.router.post("/save-gpx", this.mapController.saveGPX);
	}
}
