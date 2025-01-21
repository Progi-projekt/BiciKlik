import { Router } from 'express';
import { EventController } from '../controllers/event.controller';

export class EventRouter {
  public router: Router;
  private eventController: EventController;

  constructor() {
    this.router = Router();
    this.eventController = new EventController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/createEvent', this.eventController.createEvent);
    this.router.get('/getEvents', this.eventController.getEvents);
    this.router.get('/:eventId/signup', this.eventController.signUp);
    this.router.get('/:eventId/signout', this.eventController.signOut);
    this.router.get('/:eventId', this.eventController.getEventById);
    this.router.get('/:eventId/leaderboard', this.eventController.getParticipants);
    this.router.post('/:eventId/leaderboard', this.eventController.saveResult);
  }
}