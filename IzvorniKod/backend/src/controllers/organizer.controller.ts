import { Request, Response } from 'express';
import { EventService } from '../services/event.service';

export class OrganizerController {
	private eventService: EventService;

    constructor() {
		this.eventService = new EventService();
    }

	public isOrganizerOfEvent = async (email: string, eventId: string ) => {
		const organizer_of_event = await this.eventService.getOrganizer(eventId);
		return organizer_of_event?.email == email;
	};


	public deleteEvent = async (req: Request, res: Response) => {
        const organizer_email = req.cookies.loggedInAs; // Ensure this cookie is set
		const eventId = req.params.eventId;
        if (!organizer_email) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
		if(!await this.isOrganizerOfEvent(organizer_email, eventId)){
			return res.status(401).json({ error: 'User not authorized' });
		}
    
        try {
            const success = await this.eventService.eraseEvent(eventId);
            if (!success) {
                return res.status(404);
            }
            res.status(200).json("done");
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    
}