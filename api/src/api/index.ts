// api/src/api/index.ts
import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import config from '../config';
import apiRoutes from '../routes';
import errorHandler from '../middleware/errorHandler';

const app: Express = express();


const corsOptions = {
  origin: process.env.VITE_API_URL,
  credentials: true,
  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],

  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', apiRoutes);


app.use(errorHandler);

export default app;