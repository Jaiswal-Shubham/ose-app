// backend/src/services/subscribeService.ts
import db from '../db';
import { Subscription } from '../types';

export const addSubscriber = async (email: string): Promise<Subscription | undefined> => {
  const queryText = `
    INSERT INTO subscriptions(email) 
    VALUES($1) 
    ON CONFLICT (email) DO NOTHING
    RETURNING *
  `;
  
  const { rows } = await db.query<Subscription>(queryText, [email]);
  return rows[0];
};