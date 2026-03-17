import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the CRUD API' });
});

// Error handling middleware
app.use(errorHandler);


// Start server without DB for now
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});