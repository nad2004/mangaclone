import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import storyRoutes from './routes/story.route';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route';
import chapterRoutes from './routes/chapter.route';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // Chỉ cho phép frontend này
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] // Nếu bạn dùng cookie
}));
app.use('/api/stories', storyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chapters', chapterRoutes);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
