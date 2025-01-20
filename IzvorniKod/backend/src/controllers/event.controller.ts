import { Request, Response } from 'express';
import { EventService } from '../services/event.service';

export class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  public createEvent = async (req: Request, res: Response) => {
    try {
      const eventData = req.body;
      eventData.organizerEmail = req.cookies.loggedInAs;
      const newEvent = await this.eventService.createEvent(eventData);
      res.status(201).json(newEvent);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  };

  public getEvents = async (req: Request, res: Response) => { //getting last 10 events
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

  public getEventById = async (req: Request, res: Response) => {    //getting event by id
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

  public getParticipants = async (req: Request, res: Response) => { // getting participants from the leaderboard
    const eventId = req.params.eventId;
    try {
      const participantsData = await this.eventService.getParticipants(eventId);
      res.json(participantsData);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public addParticipant = async (req: Request, res: Response) => { // adding a participant to the leaderboard

    const email = req.cookies.loggedInAs;

		if (!email) {
			res.status(400).json({ message: "No email found in cookies." });  // check if user is logged in, if there is no cookie, return an error
			return;
		} 

    const eventId = req.params.eventId; //if ok, get the event id and time from the request 
    const { time } = req.body;

    try {
      const newParticipant = await this.eventService.saveResult(eventId, email, time);
      res.json(newParticipant);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }


}