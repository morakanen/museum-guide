import db from "../../db/db.js";
import bcrypt from "bcryptjs";

/**
 * Add a new user to the PostgreSQL database
 */
const addUser = async (username, email, password) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert the user with the hashed password assigned to the "password" column
        const [id] = await db('Users')
            .insert({
                username,
                email,
                password: hashedPassword // Store hashed password in the "password" column
            })
            .returning('id');
        
        return id; // Return the new user ID
    } catch (error) {
        console.error('Database insert error:', error);
        throw error; // Propagate the error to the controller
    }
};

/**
 * Get all users from the database
 */
const getAllUsers = async () => {
    try {
        return await db
            .select("*")
            .from("Users");
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Propagate the error to the controller
    }
};

/**
 * Get a user by email
 */
const getUserByEmail = async (email) => {
    try {
        return await db
            .select("*")
            .from("Users")
            .where({ email })
            .first();
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error; // Propagate the error to the controller
    }
};

/**
 * Get a user by ID
 */
const getUserById = async (id) => {
    try {
        return await db
            .select("*")
            .from("Users")
            .where({ id })
            .first();
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; // Propagate the error to the controller
    }
};

/**
 * Delete a user by ID
 */
const deleteUserByID = async (id) => {
    try {
        return await db("Users")
            .where({ id })
            .del();
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; // Propagate the error to the controller
    }
};

const getbyusername = async (username) => {
    try {
        return await db
            .select("*")
            .from("Users")
            .where({ username })
            .first();
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error; // Propagate the error to the controller
    }
};

export { getAllUsers, addUser, deleteUserByID, getUserById, getUserByEmail,getbyusername };