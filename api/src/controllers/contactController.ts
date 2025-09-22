// backend/src/controllers/contactController.ts
import { Request, Response, NextFunction } from 'express';
import * as contactService from '../services/contactService';
import { ContactPayload } from '../types';

export const submitContactForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { fullName, email, message } = req.body as ContactPayload;
    if (!fullName || !email || !message) {
      const error: any = new Error('Full name, email, and message are required.');
      error.statusCode = 400;
      throw error;
    }

    const newContact = await contactService.createContact(req.body);
    res.status(201).json({ success: true, message: 'Form submitted successfully!', data: newContact });
  } catch (error) {
    next(error);
  }
};