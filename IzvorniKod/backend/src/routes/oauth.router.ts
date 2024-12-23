import { Router } from "express";
import { OAuthController } from "../controllers/oauth.controller";

export class AuthRouter {
	public router: Router;
	private oauthController: OAuthController;

	constructor() {
		this.router = Router();
		this.oauthController = new OAuthController();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post("/google/callback", this.oauthController.googleCallback);
		this.router.get("/google/getAuthorization", this.oauthController.getAuthorization);
	}
}
