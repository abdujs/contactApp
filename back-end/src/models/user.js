import pool from "../src/config/db.js";

// Find user by username or email
export async function findUserByUsernameOrEmail(username, email) {
  const res = await pool.query(
    "SELECT * FROM users WHERE username = $1 OR email = $2",
    [username, email]
  );
  return res.rows[0];
}

// Create a new user
export async function createUser({ username, email, password_hash }) {
  const res = await pool.query(
    `INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at`,
    [username, email, password_hash]
  );
  return res.rows[0];
}