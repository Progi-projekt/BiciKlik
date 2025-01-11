import { Request, Response } from 'express';
import { RouteService } from '../services/route.service';

export class RouteController {
  private routeService: RouteService;

  constructor() {
    this.routeService = new RouteService();
  }

  public addReview = async (req: Request, res: Response) => { // adding a review to the event
    const email = req.cookies.loggedInAs;

    console.log("email: " + email);
		if (!email) {
			res.status(400).json({ message: "No email found in cookies." });  // check if user is logged in, if there is no cookie, return an error
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
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  } 


}