/**
 * Minimal Express bootstrap that exposes auth routes and health-check endpoint.
 * Keeps middleware concerns centralized so controllers stay focused on business logic.
 */
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoute.js";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // allow your frontend origin
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Backend API is running!');
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
