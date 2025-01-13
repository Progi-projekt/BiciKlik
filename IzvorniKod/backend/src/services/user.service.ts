import { Event } from '../models/event.model';
import { Route } from '../models/route.model';
import { Organizer } from '../models/organizer.model';
import { AppUser } from '../models/appuser.model';
import { Participation } from '../models/participation.model';
import { Save } from '../models/save.model';
import { Admin } from '../models/admin.model';

export class UserService {

	// gets all info of a user
	public async getUserInfo(email: string) {
		
		var is_organizer = await Organizer.findByPk(email) != null;
		var is_admin = await Admin.findByPk(email) != null;

		var includes = [];

		if(is_organizer){
			includes.push({
				model: Organizer,
			});
		}

		if(is_admin){
			includes.push({
				model: Admin,
			});
		}
		
		
		const user = await AppUser.findByPk(email, {
			include: includes

		});
		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}
	

}