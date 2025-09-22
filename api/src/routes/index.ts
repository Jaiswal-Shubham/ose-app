// backend/src/routes/index.ts
import { Router } from 'express';
import contactRoutes from './contactRoutes';
import subscribeRoutes from './subscribeRoutes';
const router = Router();

router.use('/contact', contactRoutes);
router.use('/subscribe', subscribeRoutes);

export default router;