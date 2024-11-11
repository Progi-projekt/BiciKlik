import { Router } from 'express';
import { googleCallback } from '../controllers/oauth.controller';

const router = Router();

router.post('/google/callback', googleCallback);

export default router;