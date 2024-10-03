const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // Return an error if email or password are missing
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userModel = new User(); // Create an instance of the User class
    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await userModel.createUser({ email, password });

    // Generate jwt token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Generated token", token);

    // Remove password from the user object before sending response
    const { password: _, ...userWithoutPassword } = newUser;
    // Send back the token and user data
    res.status(201).json({
      token, //Include the jwt token in the response,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userModel = new User(); // Create an instance of the User class
    const user = await userModel.findUserByEmail(email);

    if (!user || user.password !== password) {
      // Simplified password check
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT or any other logic
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
