// backend/src/api/index.ts
import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import config from '../config';
import apiRoutes from '../routes';
import errorHandler from '../middleware/errorHandler';

const app: Express = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', apiRoutes);


app.use(errorHandler);

export default app;