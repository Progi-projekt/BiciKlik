import { Event } from "../models/event.model";
import { Route } from "../models/route.model";
import { Organizer } from "../models/organizer.model";
import { AppUser } from "../models/appuser.model";
import { Participation } from "../models/participation.model";
import { Save } from "../models/save.model";
import { Grade } from "../models/grade.model";

export class RouteService {
	// gets all routes owned by a user
	public async getOwnedRoutes(email: string) {
		const ownedRoutes = await Route.findAll({
			where: {
				creator_email: email,
			},
			attributes: ["route_id", "route_name"],
		});
		return ownedRoutes;
	}

	// gets all routes saved by a user
	public async getSavedRoutes(email: string) {
		const savedRoutes = await Save.findAll({
			where: {
				email: email,
			},
			attributes: ["route_id"],
			include: [
				{
					model: Route,
					attributes: ["route_name"],
				},
			],
		});
		return savedRoutes.map((route) => ({
			route_id: route.route_id,
			route_name: route.route.route_name,
		}));
	}

	/// get all details of a route
	public async getRouteById(routeId: string) {
		const route = await Route.findByPk(routeId);
		if (!route) {
			throw new Error("Route not found");
		}
		return route;
	}

	// user saves a route
	public async saveRoute(email: string, routeId: string) {
		const save = new Save();
		save.email = email;
		save.route_id = routeId;
		await save.save();
	}

	// user unsaves a route
	public async unsaveRoute(email: string, routeId: string) {
		await Save.destroy({
			where: {
				email: email,
				route_id: routeId,
			},
		});
	}

	// user grades a route
	public async addReview(routeId: string, email: string, comment: string, rating: number) {
		const oldReview = await Grade.findOne({
			where: {
				grader_email: email,
				route_id: routeId,
			},
		});

		if (oldReview) {
			await oldReview.destroy();
		}

		const review = new Grade();
		review.grader_email = email;
		review.route_id = routeId;
		review.comment = comment;
		review.grade = rating;
		console.log(review);

		await review.save();
	}

	public async deleteRoute(routeId: string) {
		var route = await Route.findByPk(routeId);
		if (route == null) {
			return false;
		}
		await route.destroy();
		//TODO remove route gpx
		// what to do about events? -- honestly, that's a good question
		return true;
	}
	public async isRouteSaved(email: string, routeId: string): Promise<boolean> {
		const savedRoute = await Save.findOne({
			where: {
				email: email,
				route_id: routeId,
			},
		});

		return savedRoute !== null;
	}

	public async getReviews(routeId: string) {
		try{
			const reviews = await Grade.findAll({
				where: {
					route_id: routeId,
				},
				attributes: ["grader_email", "comment", "grade"],
			});
			const plainReviews =  reviews.map((review) => review.toJSON());
			return plainReviews;

		}
		catch (error) {
			console.error("Error getting reviews:", error);
			throw error;
		}
	}
}
