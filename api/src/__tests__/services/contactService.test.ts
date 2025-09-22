import { createContact } from '../../services/contactService';
import db from '../../db';
import { ContactPayload } from '../../types';

// Mock the database module
jest.mock('../../db');

// Create a typed mock of the db query function
const mockDbQuery = db.query as jest.Mock;

describe('Contact Service', () => {
  
  describe('createContact', () => {
    
    it('should insert a new contact into the database and return the created contact', async () => {
      // Arrange
      const contactData: ContactPayload = {
        fullName: 'Jane Doe',
        email: 'jane.doe@example.com',
        linkedin: 'https://linkedin.com/in/janedoe',
        message: 'Hello World',
      };

      const expectedDbResponse = {
        id: 1,
        full_name: 'Jane Doe',
        email: 'jane.doe@example.com',
        linkedin_url: 'https://linkedin.com/in/janedoe',
        message: 'Hello World',
        submitted_at: new Date(),
      };

      // Configure the mock to return our expected response
      mockDbQuery.mockResolvedValue({ rows: [expectedDbResponse] });

      // Act
      const result = await createContact(contactData);

      // Assert
      expect(result).toEqual(expectedDbResponse);
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO contacts'),
        ['Jane Doe', 'jane.doe@example.com', 'https://linkedin.com/in/janedoe', 'Hello World']
      );
    });

    it('should handle an optional linkedin URL correctly by passing null', async () => {
      // Arrange
      const contactData: ContactPayload = {
        fullName: 'John Smith',
        email: 'john.smith@example.com',
        message: 'Another message',
        // No linkedin URL
      };
      
      const expectedDbResponse = { id: 2, ...contactData, linkedin_url: null };
      mockDbQuery.mockResolvedValue({ rows: [expectedDbResponse] });

      // Act
      await createContact(contactData);

      // Assert
      expect(db.query).toHaveBeenCalledWith(
        expect.any(String),
        ['John Smith', 'john.smith@example.com', null, 'Another message']
      );
    });
  });
});
