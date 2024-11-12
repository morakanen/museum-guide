// Import necessary modules
import express from "express";
import usersRouters from "./routes/users.js"; // Correctly named as usersRouters
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";



// Loads environment variables from .env file
dotenv.config();

// Gets __filename and __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//initailses express
const app = express();

// set port as 5005
const PORT = process.env.PORT || 5005; // Use PORT from .env or default to 5005

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//parser for sending emails
app.use(bodyParser.json());


app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 

// Routes refers to teh routes users.js where routes for api calls are stored
app.use("/api", usersRouters); 

//default path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handles bad routes
app.use((req, res) => {
  res.status(400).send("Bad request. Bad route found.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

