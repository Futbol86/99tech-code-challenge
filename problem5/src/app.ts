import express from 'express';
import resourceRoutes from './routes/resourceRoutes.ts';
import errorHandler from './utils/error-handler.ts';
const { Application } = express;

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', resourceRoutes);
app.use(errorHandler);

export default app;