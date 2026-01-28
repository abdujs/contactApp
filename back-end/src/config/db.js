// db.js: Sets up and exports a PostgreSQL connection pool for running SQL queries from the backend.
// This file lets your backend talk directly to the database using the pg library and environment variables.

// Import the pg library's Pool class (lets you manage connections)
import pkg from 'pg';
const { Pool } = pkg;

// Import dotenv to load environment variables from .env
import dotenv from 'dotenv';
dotenv.config();

// Create a new Pool instance with your database config
const pool = new Pool({
  host: process.env.DB_HOST,       
  user: process.env.DB_USER,       
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,  
  port: process.env.DB_PORT,       
});

// Export the pool so you can use it in other files
export default pool;