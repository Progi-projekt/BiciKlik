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

  public async getEventByRouteId(route_id: string) {
    try {
      const event = await Event.findOne({
        where: { route_id },
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

      if (!event) {
        throw new Error('Event not found');
      }

      return {
        route_id: event.route_id,
        short_description: event.description,
        organizer: event.organizer.appUser.name,
        event_name: event.event_name,
        event_time: event.event_time,
      };
    } catch (error) {
      throw new Error('Failed to fetch event data');
    }
  }
}