// backend/controllers/authController.js
const admin = require("../utils/firebaseAdmin");
const { createToken } = require("../utils/jwt");
const User = require("../models/User");

// Register user (or login) using Firebase token and generate JWT
const registerUser = async (req, res) => {
  const { token } = req.body; // Firebase token from frontend

  try {
    // Validate Firebase token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, uid } = decodedToken;

    // Check if the user already exists in your database
    const user = await User.findByEmail(email);
    if (!user) {
      // If user does not exist, create a new user in MongoDB
      const newUser = { email, uid };
      await User.createUser(newUser);
    }

    // Generate JWT for the user
    const jwtToken = createToken({ email, uid });

    // Send the JWT token back to the frontend
    res.status(201).json({ token: jwtToken });
  } catch (error) {
    console.error("Error in registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user (similar to registerUser, but for login)
const loginUser = async (req, res) => {
  const { token } = req.body; // Firebase token from frontend

  try {
    // Validate Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, uid } = decodedToken;

    // Check if the user exists
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate JWT
    const jwtToken = createToken({ email, uid });
    console.log("JWT", jwtToken);

    // Send the JWT token back to the frontend
    res.status(200).json({ token: jwtToken });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser };
