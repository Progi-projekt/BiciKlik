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

  public getEventById = async (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    try {
      const event = await this.eventService.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  };

  public getParticipants = async (req: Request, res: Response) => {
    const eventId = req.params.eventId;
    try {
      const participants = await this.eventService.getParticipants(eventId);
      res.json(participants);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}