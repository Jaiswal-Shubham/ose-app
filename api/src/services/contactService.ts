// backend/src/services/contactService.ts
import db from '../db';
import { Contact, ContactPayload } from '../types';

export const createContact = async (contactData: ContactPayload): Promise<Contact> => {
  const { fullName, email, linkedin, message } = contactData;
  
  const queryText = `
    INSERT INTO contacts(full_name, email, linkedin_url, message) 
    VALUES($1, $2, $3, $4) 
    RETURNING *
  `;
  const values = [fullName, email, linkedin || null, message];
  
  const { rows } = await db.query<Contact>(queryText, values);
  return rows[0];
};