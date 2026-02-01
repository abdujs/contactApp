/**
 * Auth controller orchestrates validation, persistence, and JWT issuance for the auth routes.
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, findUserByUsername, findUserByUsernameOrEmail, createUser } from "../models/userModel.js";

// Registration controller
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    // Check if user exists (by username or email)
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

// Login controller
export async function login(req, res) {
  try {
    const { identifier, password } = req.body; // identifier can be username or email
    if (!identifier || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    // Try to find user by email first, then username
    let user = await findUserByEmail(identifier);
    if (!user) {
      user = await findUserByUsername(identifier);
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    // Compare password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    // Generate JWT with Hasura claims
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": user.id
        }
      },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "1d" }
    );
    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
}