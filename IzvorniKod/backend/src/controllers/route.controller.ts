import { Request, Response } from "express";
import { RouteService } from "../services/route.service";

export class RouteController {
	private routeService: RouteService;

	constructor() {
		this.routeService = new RouteService();
	}

	public addReview = async (req: Request, res: Response) => {
		// adding a review to the event
		const email = req.cookies.loggedInAs;

		console.log("email: " + email);
		if (!email) {
			res.status(400).json({ message: "No email found in cookies." }); // check if user is logged in, if there is no cookie, return an error
			return;
		}

		const routeId = req.params.routeId; //extract routeId from request parameters
		const rating = req.body.rating; // -||- from req body
		const review = req.body.review; // -||- from req body

		try {
			const newReview = await this.routeService.addReview(routeId, email, review, rating);
			res.json(newReview);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			} else {
				res.status(500).json({ error: "An unknown error occurred" });
			}
		}
	};
	public myRoutes = async (req: Request, res: Response) => {
		const email = req.cookies.loggedInAs;
		if (!email) {
			res.status(400).json({ message: "No email found in cookies." });
			return;
		}
		try {
			const savedRoutes = await this.routeService.getSavedRoutes(email);
			const ownedRoutes = await this.routeService.getOwnedRoutes(email);
			res.json({ savedRoutes, ownedRoutes });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			} else {
				res.status(500).json({ error: "An unknown error occurred" });
			}
		}
	};
	public saveRoute = async (req: Request, res: Response) => {
		const email = req.cookies.loggedInAs;
		const routeId = req.params.routeId;
		if (!email) {
			res.status(400).json({ message: "No email found in cookies." });
			return;
		}
		try {
			const savedRoute = this.routeService.saveRoute(email, routeId);
			res.status(200).json(savedRoute);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			} else {
				res.status(500).json({ error: "An unknown error occurred" });
			}
		}
	};
	public unsaveRoute = async (req: Request, res: Response) => {
		const email = req.cookies.loggedInAs;
		const routeId = req.params.routeId;
		if (!email) {
			res.status(400).json({ message: "No email found in cookies." });
			return;
		}
		try {
			const savedRoute = this.routeService.unsaveRoute(email, routeId);
			res.status(200).json(savedRoute);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			} else {
				res.status(500).json({ error: "An unknown error occurred" });
			}
		}
	};
	public saved = async (req: Request, res: Response) => {
		const email = req.cookies.loggedInAs;
		const routeId = req.params.routeId;

		if (!email) {
			res.status(400).json({ message: "No email found in cookies." });
			return;
		}

		try {
			const isSaved = await this.routeService.isRouteSaved(email, routeId);
			res.status(200).json({ saved: isSaved });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			} else {
				res.status(500).json({ error: "An unknown error occurred" });
			}
		}
	};

	public getReviews = async (req: Request, res: Response) => {
		const routeId = req.params.routeId;
		try {
			const reviews = await this.routeService.getReviews(routeId);
			res.json(reviews);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			} else {
				res.status(500).json({ error: "An unknown error occurred" });
			}
		}
	};
	public getAllRoutes = async (req: Request, res: Response) => {
		try {
			const routes = await this.routeService.getAllRoutes();
			res.status(200).json(routes);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			} else {
				res.status(500).json({ error: "An unknown error occurred" });
			}
		}
	};
}
