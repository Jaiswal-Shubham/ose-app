import { addSubscriber } from '../../services/subscribeService';
import db from '../../db';
import { Subscription } from '../../types';

// Mock the database module
jest.mock('../../db');

// Create a typed mock of the db query function
const mockDbQuery = db.query as jest.Mock;

describe('Subscribe Service', () => {

  describe('addSubscriber', () => {

    it('should add a new subscriber and return the new subscription data', async () => {
      // Arrange
      const email = 'test@example.com';
      const expectedSubscription: Subscription = {
        id: 1,
        email,
        subscribed_at: new Date(),
      };
      
      // Mock the db response for a new subscription
      mockDbQuery.mockResolvedValue({ rows: [expectedSubscription] });

      // Act
      const result = await addSubscriber(email);

      // Assert
      expect(result).toEqual(expectedSubscription);
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO subscriptions'),
        [email]
      );
    });

    it('should return undefined if the subscriber already exists', async () => {
      // Arrange
      const email = 'existing@example.com';
      
      // The "ON CONFLICT" query returns an empty rows array for existing emails
      mockDbQuery.mockResolvedValue({ rows: [] });

      // Act
      const result = await addSubscriber(email);

      // Assert
      expect(result).toBeUndefined();
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(
        expect.any(String),
        [email]
      );
    });
  });
});
