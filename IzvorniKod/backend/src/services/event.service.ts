import { Event } from '../models/event.model';
import { Route } from '../models/route.model';
import { Organizer } from '../models/organizer.model';
import { AppUser } from '../models/appuser.model';

export class EventService {
  public async getLastTenEvents() {
    const events = await Event.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Route,
          attributes: ['route_id', 'route_name'],
        },
        {
          model: Organizer,
          include: [
            {
              model: AppUser,
              attributes: ['name'],
            },
          ],
          attributes: ['email'],
        },
      ],
    });

    return events.map(event => ({
      route_id: event.route_id,
      short_description: event.description,
      organizer: event.organizer.appUser.name,
      event_name: event.event_name,
      event_time: event.event_time,
    }));
  }

  public async getEventById(eventId: string): Promise<any> {
    const event = await Event.findByPk(eventId, {
      include: [
        {
          model: Organizer,
          include: [
            {
              model: AppUser,
              attributes: ['name'],
            },
          ],
          attributes: ['email'],
        },
      ],
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return {
      event_id: event.event_id,
      short_description: event.description,
      organizer: event.organizer.appUser.name,
      event_name: event.event_name,
      event_time: event.event_time,
    };
  }

  public async getParticipants(eventId: string) {
    // Hardcoded data for testing purposes
    const participants = [
      { name: 'John Doe', time: '00:45:30' },
      { name: 'Jane Smith', time: '00:50:15' },
      { name: 'Alice Johnson', time: '00:55:20' }
    ];
    
    return participants;
  }
}