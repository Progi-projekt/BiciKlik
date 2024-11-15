import { Request, Response } from 'express';
import { getLastTenEvents } from '../services/event.service';

export const getRecentEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await getLastTenEvents();
    res.json(events);
  } catch (error) {
    console.error('Error fetching recent events:', error);
    res.status(500).json({ message: 'Failed to fetch recent events' });
  }
};