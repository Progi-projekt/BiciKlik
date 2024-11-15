import { Router } from 'express';
import { getRecentEvents } from '../controllers/event.controller';

const router = Router();

router.get('/get-recent', getRecentEvents);

export default router;