import { getAllUsers, addUser, deleteUserByID, getUserById, getUserByEmail, getbyusername } from "../public/models/users.js";
import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";





/**
 * Controller for retrieving all users
 */
const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Error retrieving users' });
    }
};

const createUser = async (req, res) => {
    console.log(req.body); 
    const { username, email, password } = req.body;

    // Validates that both username and email are provided
    if (!username || !email ||!password) {
        return res.status(400).json({ error: 'Username,email and password are required' });
    }

    try {
        // Checks if the user already exists by email
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create new user (if no user with the given email exists)
        const id = await addUser(username, email, password);
        res.status(201).json({ id, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(400).json({ error: 'Error adding user' });
    }
};

/**
 * Controller for retrieving a user by ID
 */
const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Error retrieving user' });
    }
};

/**
 * Controller for deleting a user by ID
 */
const removeUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await deleteUserByID(id);
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
};



  const Museumapi = async (req, res) => {
    try {
      const { query } = req.query;  // Extract the `query` parameter from the request
  
      // Make the API call with the dynamic query value
      const response = await axios.get(
        `https://data.fitzmuseum.cam.ac.uk/api/v1/linked-art?query=${query}&page=1&size=20&sort=asc&hasImage=1`,
        {
          headers: {
            'Authorization': `Bearer 509|kzymUrqzMar1xQOZjQ37xoKYcuszTH3OyMCg5tU7`,
            'Content-Type': 'application/json',
          }
        }
      );
  
      res.status(200).json(response.data); // Send the data back to the frontend
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };

  const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const user = await getbyusername(username);
        
        if (user && await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });
          res.json({ message: 'Login successful', token });
        } else {
          res.status(401).json({ message: 'Invalid username or password' });
        }
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };

    const authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const accesstoken = authHeader && authHeader.split(' ')[1];
      
        if (!accesstoken) return res.sendStatus(401);
      
        jwt.verify(accesstoken, process.env.JWT_SECRET, (err, user) => {
          if (err) return res.sendStatus(403);
          req.user = user;
          next();
        });
      };

  export { getUsers, createUser, getUser, removeUser, Museumapi,loginUser,authenticateToken };