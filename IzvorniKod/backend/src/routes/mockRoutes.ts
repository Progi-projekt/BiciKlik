import {Router,Request,Response} from 'express';
import bcrypt = require('bcrypt');
const {body,validationResult} = require('express-validator');
const mockRouter=Router();

mockRouter.get('/get-ten', (req: Request, res: Response) => {
  const events = Array.from({ length: 10 }, (_, i) => ({
    created_time: new Date().toISOString().split('T')[0],
    event_time: new Date().toISOString().split('T')[0],
    description: `Event description ${i + 1}`,
    event_id: i + 1,
    event_name: `Event ${i + 1}`,
    route_id: i + 1,
    organizer_email: `organizer${i + 1}@example.com`
  }));

  res.json(events);
});
export default mockRouter;