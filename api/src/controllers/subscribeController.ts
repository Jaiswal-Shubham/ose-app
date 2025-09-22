// backend/src/controllers/subscribeController.ts
import { Request, Response, NextFunction } from 'express';
import * as subscribeService from '../services/subscribeService';

export const createSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body as { email: string };
    if (!email) {
      const error: any = new Error('Email is required.');
      error.statusCode = 400;
      throw error;
    }

    const newSubscriber = await subscribeService.addSubscriber(email);
    
    if (!newSubscriber) {
      res.status(200).json({ success: true, message: 'You are already subscribed!' });
      return;
    }

    res.status(201).json({ success: true, message: 'Successfully subscribed!', data: newSubscriber });
  } catch (error) {
    next(error);
  }
};