
import express from 'express'
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { noteRoutes } from './routes/noteRoutes.js';

const app = express();

app.use(express.json());

app.use("/notes", noteRoutes)

app.use(errorMiddleware);

export default app;