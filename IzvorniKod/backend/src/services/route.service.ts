import { Event } from '../models/event.model';
import { Route } from '../models/route.model';
import { Organizer } from '../models/organizer.model';
import { AppUser } from '../models/appuser.model';
import { Regular } from '../models/regular.model';
import { Participation } from '../models/participation.model';
import { Save } from '../models/save.model';
import { Grade } from '../models/grade.model';

export class RouteService {


	// gets all routes owned by a user
	public async getOwnedRoutes(email: string) {
		const ownedRoutes = await Route.findAll({
			where: {
				email: email,
			},
			attributes: ['route_id', 'route_name'],
		});
		return ownedRoutes;
	}

	// gets all routes saved by a user
	public async getSavedRoutes(email: string) {
		const savedRoutes = await Save.findAll({
			where: {
				creator_email: email,
			},
			attributes: ['route_id'],
			include: [{
				model: Route,
				attributes: ['route_name'],
			}]
		});
		return savedRoutes.map(route => ({
			route_id: route.route_id,
			route_name: route.route.route_name,
		}));
	}

	/// get all details of a route
	public async getRouteById(routeId: string) {
		const route = await Route.findByPk(routeId);
		if (!route) {
			throw new Error('Route not found');
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
	public async addReview(routeId: string, email: string, review: string, rating: string){
		const save = new Grade();
		save.grader_email = email;
		save.route_id = routeId;
		save.comment = review;
		const gradeNumber = parseInt(rating[0]);
		save.grade = gradeNumber;
		await save.save();
	}




}