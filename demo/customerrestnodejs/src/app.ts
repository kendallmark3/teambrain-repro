import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes';
import healthRoutes from './routes/healthRoutes';
import { errorHandler } from './middleware/errorHandler';

/** Builds and configures the Express application — separate from server startup to support testing. */
const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', healthRoutes);
app.use('/api/employees', employeeRoutes);

app.use(errorHandler);

export default app;
