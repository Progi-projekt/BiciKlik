import { Request, Response } from "express";
import { OAuthService } from "../services/oauth.service";
import { AppUser } from "../models/appuser.model";
import { Admin } from "../models/admin.model";
import { Organizer } from "../models/organizer.model";
import { AdminService } from "../services/admin.service";

export class OAuthController {
	private oauthService: OAuthService;
	private adminService: AdminService;

	constructor() {
		this.oauthService = new OAuthService();
		this.adminService = new AdminService();
	}

	public googleCallback = async (req: Request, res: Response): Promise<void> => {
		const { token } = req.body;

		try {
			const user = await this.oauthService.verifyGoogleToken(token);
			req.session.loggedInAs = user.email;
			res.cookie("loggedInAs", user.email, { httpOnly: true });
			res.json({ message: "Login successful", user });
		} catch (error) {
			console.error("Error during Google OAuth callback:", error); // Log the error for debugging

			if (error instanceof Error) {
				res.status(500).json({ message: "Login failed", error: error.message });
			} else {
				res.status(500).json({ message: "Login failed", error: "Unknown error" });
			}
		}
	};

	public getAuthorization = async (req: Request, res: Response) => {
		const email = req.cookies.loggedInAs; 
		if (!email) {
			return res.status(401).json({ error: "User not authenticated" });
		}

		const userInfo = await this.adminService.getUserInfo(email);
		const archived = userInfo?.archived_reason
		
		if (archived != null) {
			return res.status(403).json({ error: "User is archived", reason: archived });
		}

		try {
			const info = await this.adminService.getUserInfo(email);
			if (!info) {
				return res.status(404);
			}
			res.status(200).json(info);
		} catch (error) {
			console.error("Error fetching user:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	};
	public logOut = async (req: Request, res: Response): Promise<void> => {
		res.clearCookie("loggedInAs", { httpOnly: true });
		req.session.destroy((err) => {
			if (err) {
				console.error("Error destroying session:", err);
				res.status(500).json({ message: "Failed to log out" });
			} else {
				res.json({ message: "Successfully logged out" });
			}
		});
	};
	public upgrade = async (req: Request, res: Response): Promise<void> => {
		try {
			const user = await AppUser.findOne({ where: { email: req.cookies.loggedInAs } });
			if (user) {
				await Organizer.create({ email: req.cookies.loggedInAs });
				res.status(200).json({ message: "Upgrade successful" });
			} else {
				res.status(404).json({ message: "User not found" });
			}
		} catch (error) {
			console.error("Error upgrading user:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	};

	public downgrade = async (req: Request, res: Response): Promise<void> => {
		try {
			const user = await Organizer.findOne({ where: { email: req.cookies.loggedInAs } });
			if (user) {
				await Organizer.destroy({ where: { email: req.cookies.loggedInAs } });
				res.status(200).json({ message: "Downgrade successful" });
			} else {
				res.status(404).json({ message: "User not found" });
			}
		} catch (error) {
			console.error("Error downgrading user:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	};
}
