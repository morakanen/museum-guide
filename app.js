// Import necessary modules
import express from "express";
import usersRouters from "./routes/users.js"; // Correctly named as usersRouters
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";
import dotenv from "dotenv";



// Load environment variables from .env file
dotenv.config();

// Get __filename and __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 5005; // Use PORT from .env or default to 5005

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.use("/api", usersRouters); // Use user routers for API routes

// Serve index.html on root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle bad routes
app.use((req, res) => {
  res.status(400).send("Bad request. Bad route found.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

