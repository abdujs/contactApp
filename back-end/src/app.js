// Basic Express server setup (ES6+)
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "../routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Backend API is running!');
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
