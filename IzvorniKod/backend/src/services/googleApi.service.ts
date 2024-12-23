// backend/src/services/googleApiService.ts
import { Client } from "@googlemaps/google-maps-services-js";
import { LatLng } from "@googlemaps/google-maps-services-js/dist/common";

export class GoogleApiService {
  private client: Client;

  constructor() {
    this.client = new Client({});
  }

  public async createRoute(origin: string, destination: string, waypoints: string[]) {
    try {
        const formattedWaypoints: LatLng[] = waypoints.map((waypoint) => {
          const [lat, lng] = waypoint.split(",");
          return { lat: parseFloat(lat), lng: parseFloat(lng) };
        });
  
        const response = await this.client.directions({
          params: {
            origin,
            destination,
            waypoints: formattedWaypoints,
            key: process.env.GOOGLE_API_KEY as string,
          },
      });
      return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to create route: ${error.message}`);
        } else {
            throw new Error("Failed to create route: Unknown error.");
        }
      
    }
  }
}