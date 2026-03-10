import express from 'express'
import { errorHandler } from './middleware/errorMiddleware.js';
import taskRoutes  from './routes/taskRoutes.js'

const app = express();

app.use(express.json());

app.use("/task", taskRoutes)

app.use(errorHandler);

export default app;