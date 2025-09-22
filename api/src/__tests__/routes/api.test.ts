import request from 'supertest';
import http from 'http';
import app from '../../api';
import * as contactService from '../../services/contactService';
import * as subscribeService from '../../services/subscribeService';

jest.mock('../../services/contactService');
jest.mock('../../services/subscribeService');

const mockCreateContact = contactService.createContact as jest.Mock;
const mockAddSubscriber = subscribeService.addSubscriber as jest.Mock;

describe('API Endpoints', () => {
  let server: http.Server;
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll((done) => {
    server = app.listen(0);
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    done();
  });

  afterAll((done) => {
    consoleErrorSpy.mockRestore();
    server.close(done);
  });

  describe('POST /api/contact', () => {
    it('should return 201 and success message for a valid submission', async () => {
      const contactData = {
        fullName: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message',
      };
      
      mockCreateContact.mockResolvedValue({ id: 1, ...contactData });

      const res = await request(server) // Use the running server
        .post('/api/contact')
        .send(contactData);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Form submitted successfully!');
      expect(res.body.data).toBeDefined();
    });

    it('should return 400 if required fields are missing', async () => {
      const contactData = { fullName: 'Test User', email: 'test@example.com' }; // Missing message

      const res = await request(server) // Use the running server
        .post('/api/contact')
        .send(contactData);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Full name, email, and message are required.');
    });
  });

  describe('POST /api/subscribe', () => {
    it('should return 201 for a new subscriber', async () => {
      const email = 'new.subscriber@example.com';
      mockAddSubscriber.mockResolvedValue({ id: 1, email });

      const res = await request(server) // Use the running server
        .post('/api/subscribe')
        .send({ email });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Successfully subscribed!');
      expect(res.body.data).toBeDefined();
    });

    it('should return 200 if the user is already subscribed', async () => {
      const email = 'existing.subscriber@example.com';
      mockAddSubscriber.mockResolvedValue(undefined);

      const res = await request(server)
        .post('/api/subscribe')
        .send({ email });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('You are already subscribed!');
      expect(res.body.data).toBeUndefined();
    });

    it('should return 400 if email is not provided', async () => {
      const res = await request(server)
        .post('/api/subscribe')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Email is required.');
    });
  });
});

