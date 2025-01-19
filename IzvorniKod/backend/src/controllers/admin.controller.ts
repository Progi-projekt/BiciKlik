import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { EventService } from '../services/event.service';

export class AdminController {
    private adminService: AdminService;

    constructor() {
        this.adminService = new AdminService();
    }

	public isAdmin = async (email: string ) => {
		const user = await this.adminService.getUserInfo(email);
		return user.is_admin;
	};


    public getUserInfo = async (req: Request, res: Response) => {
        const email = req.cookies.loggedInAs; // Ensure this cookie is set
        if (!email) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
		if(!await this.isAdmin(email)){
			return res.status(401).json({ error: 'User not authorized' });
		}
    
        try {
            const info = await this.adminService.getUserInfo(email);
            if (!info) {
                return res.status(404);
            }
            res.status(200).json(info);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

	public archiveUser = async (req: Request, res: Response) => {
        const email = req.cookies.loggedInAs; // Ensure this cookie is set
		const reason = req.body.reason;
        if (!email) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
		if(!await this.isAdmin(email)){
			return res.status(401).json({ error: 'User not authorized' });
		}
    
        try {
            const success = await this.adminService.changeUserArchiveStatus(email, reason);
            if (!success) {
                return res.status(404);
            }
            res.status(200).json("done");
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    
}