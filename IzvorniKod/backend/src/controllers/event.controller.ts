import { Request, Response } from 'express';
import { EventService } from '../services/event.service';

export class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  public createEvent = async (req: Request, res: Response) => {
    // TODO
  };

  public getEvents = async (req: Request, res: Response) => {
    try {
      const events = await this.eventService.getLastTenEvents();
      res.json(events);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  };

  public getEventByRouteId = async (req: Request, res: Response) => {
    const { route_id } = req.params;
    try {
      const event = await this.eventService.getEventByRouteId(route_id);
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  };
}