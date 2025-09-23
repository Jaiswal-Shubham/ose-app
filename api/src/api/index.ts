// api/src/api/index.ts
import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import config from '../config';
import apiRoutes from '../routes';
import errorHandler from '../middleware/errorHandler';

const app: Express = express();

const vercelProductionUrl = process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`;
const vercelPreviewUrl = process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`;

const whitelist = [
  'http://localhost:3001',
  vercelProductionUrl,
  vercelPreviewUrl,
].filter(Boolean) as string[];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
 };
 
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', apiRoutes);


app.use(errorHandler);

export default app;