// backend/src/routes/subscribeRoutes.ts
import { Router } from 'express';
import { createSubscription } from '../controllers/subscribeController';
const router = Router();

router.post('/', createSubscription);

export default router;