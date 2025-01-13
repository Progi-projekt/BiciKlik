import { Route } from "../models/route.model";
import { Organizer } from "../models/organizer.model";

export class MapService {
	public async saveRoute(routeData: {
		route_id: string;
		route_name: string;
		route_data_path_gpx: string;
		creator_email: string;
	}): Promise<Route> {
		try {
			// Check if the organizer exists
			const organizer = await Organizer.findOne({ where: { email: routeData.creator_email } });
			if (!organizer) {
				throw new Error("Organizer not found");
			}

			// Create a new route
			const newRoute = await Route.create({
				route_id: routeData.route_id,
				route_name: routeData.route_name,
				route_data_path_gpx: routeData.route_data_path_gpx,
				creator_email: routeData.creator_email,
			});

			return newRoute;
		} catch (error) {
			console.error("Error saving route:", error);
			throw new Error("Failed to save route");
		}
	}
}
