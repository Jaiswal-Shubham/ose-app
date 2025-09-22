// backend/src/api/index.ts
import 'dotenv/config'; 
import express, { Express } from 'express';
import cors from 'cors';
import config from '../config';
import apiRoutes from '../routes';
import errorHandler from '../middleware/errorHandler';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);



if (process.env.NODE_ENV !== 'production') {
  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
}

// Export for Vercel
export default app;

