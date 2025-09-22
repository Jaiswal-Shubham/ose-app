// src/__mocks__/db.ts
// This file provides a manual mock for the db module.
// Jest will automatically use this file instead of the real ../db.ts
// in any test file that has `jest.mock('../db');`

export default {
  // We use jest.fn() to create a mock function that we can spy on and configure in our tests.
  query: jest.fn().mockResolvedValue({ rows: [] }),
};
