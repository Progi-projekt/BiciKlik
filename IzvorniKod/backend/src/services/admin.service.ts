import { Event } from '../models/event.model';
import { Route } from '../models/route.model';
import { Organizer } from '../models/organizer.model';
import { AppUser } from '../models/appuser.model';
import { Participation } from '../models/participation.model';
import { Save } from '../models/save.model';
import { Admin } from '../models/admin.model';
import { arch } from 'os';

export class AdminService {

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

		return {
			email: user.email,
			first_name: user.name,
			is_organizer: is_organizer,
			is_admin: is_admin,
			archived_reason: user.archived_reason,
		};
	}

	public async changeUserArchiveStatus(email: string, reason: string|null) {
		
		const user = await AppUser.findByPk(email);
		if (!user) {
			return false;
		}
		if(user.archived_reason == reason){
			user.archived_reason = null;
		}
		else{
			user.archived_reason = reason;
		}
		await user.save();
		return true;
	}

	public async promoteToOrganizer(email: string) {
		const organizer_user = await Organizer.findByPk(email);
		if (organizer_user) {
			return false;
		}

		const new_organizer = await Organizer.create({email});
		await new_organizer.save();
		return true;
	}

	public async demoteOrganizer(email: string) {
		
		const organizer_user = await Organizer.findByPk(email);
		if (!organizer_user) {
			return false;
		}

		await organizer_user.destroy();
		return true;
	}
	

}