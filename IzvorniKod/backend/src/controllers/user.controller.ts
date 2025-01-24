import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }


    public getMyEmail = async (req: Request, res: Response) => {
        const email = req.cookies.loggedInAs; // Ensure this cookie is set
        if (!email) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
		return res.status(200).json({ email });
    };
    
}