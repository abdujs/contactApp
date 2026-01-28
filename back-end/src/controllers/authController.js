import bcrypt from "bcrypt";
import { findUserByUsernameOrEmail, createUser } from "../models/user.js";

// Registration controller
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    // Check if user exists
    const existing = await findUserByUsernameOrEmail(username, email);
    if (existing) {
      return res.status(409).json({ error: "Username or email already exists." });
    }
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    // Create user
    const user = await createUser({ username, email, password_hash });
    res.status(201).json({ message: "User registered successfully!", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
}