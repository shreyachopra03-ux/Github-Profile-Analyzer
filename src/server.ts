import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzerRoutes from './routes/analyzerRoutes';
import errorHandler from './middlewares/errorHandler.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/analyzer', analyzerRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running perfectly!' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server seamlessly running on port: ${PORT}`);
});