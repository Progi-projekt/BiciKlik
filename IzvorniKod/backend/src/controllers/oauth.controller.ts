import { Request, Response } from "express";
import { OAuthService } from "../services/oauth.service";
import { AppUser } from "../models/appuser.model";
import { Admin } from "../models/admin.model";
import { Organizer } from "../models/organizer.model";

export class OAuthController {
	private oauthService: OAuthService;

	constructor() {
		this.oauthService = new OAuthService();
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

	public getAuthorization = async (req: Request, res: Response): Promise<void> => {
		const email = req.cookies.loggedInAs;

		if (!email) {
			res.status(400).json({ message: "No loggedInAs cookie found" });
			return;
		}
		try {
			const user = await AppUser.findOne({ where: { email } });
			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			if (Admin.findOne({ where: { email } }) != null) {
				res.json({ loggedInAs: user.email, role: "admin" });
			} else if (Organizer.findOne({ where: { email } }) != null) {
				res.json({ loggedInAs: user.email, role: "organizer" });
			} else {
				res.json({ loggedInAs: user.email, role: "user" });
			}
		} catch (error) {
			console.error("Error fetching user role:", error);
			const errorMessage = error instanceof Error ? error.message : "Unknown error";
			res.status(500).json({ message: "Failed to fetch user role", error: errorMessage });
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
		let user = AppUser.findOne({ where: req.cookies.loggedInAs });
		if (user != null) {
			Organizer.create(req.cookies.loggedInAs);
			res.status(200);
		}
	};

	public downgrade = async (req: Request, res: Response): Promise<void> => {
		let user = Organizer.findOne({ where: req.cookies.loggedInAs });
		if (user != null) {
			Organizer.destroy(req.cookies.loggedInAs);
			res.status(200);
		}
	};
}
