
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import documentRoutes from './routes/documentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import logRoutes from './routes/logRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', documentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/logs', logRoutes);

// Database Connection
connectDB();

// Welcome route
app.get('/', (req, res) => {
  res.send('LegalisAI API with enhanced schema is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
