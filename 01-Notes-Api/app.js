
import express from 'express'
import { errorMiddleware } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json());

app.use(errorMiddleware);

export default app;