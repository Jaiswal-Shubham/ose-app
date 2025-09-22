// backend/src/config/index.ts
import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.DATABASE_URL as string,
};

export default config;