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
		this.router.get("/getAuthorization", this.oauthController.getAuthorization);
		this.router.post("/logout", this.oauthController.logOut);
		this.router.post("/upgrade",this.oauthController.upgrade);
		this.router.post("/downgrade",this.oauthController.downgrade);
	}
}
