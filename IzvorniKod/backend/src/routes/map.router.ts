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
    this.router.post("/createRoute", this.mapController.createRoute);
  }
}