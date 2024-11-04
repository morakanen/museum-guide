import express from "express";
import Personrouters from "./routes/users.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: '${__dirname}/app/routes/.env' });


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app =express();


const PORT = 5005;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users",Personrouters);

app.use((req,res) =>{
    res.status(400).send("Bad request.bad route found")
});