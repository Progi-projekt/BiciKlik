// backend/src/controllers/mapController.ts
import { Request, Response } from "express";
import { GoogleApiService } from "../services/googleApi.service";

export class MapController {
  private googleApiService: GoogleApiService;

  constructor() {
    this.googleApiService = new GoogleApiService();
  }

  public createRoute = async (req: Request, res: Response) => {
    const { origin, destination, waypoints } = req.body;

    try {
      const route = await this.googleApiService.createRoute(origin, destination, waypoints);
      res.json(route);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
          } else {
            res.status(500).json({ error: 'An unknown error occurred' });
          }
    }
  };
}