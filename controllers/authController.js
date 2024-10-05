const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const getCurrentUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userModel = new User();
    const user = await userModel.findUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ email: user.email, role: user.role });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid token", error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { email, password, role = "user" } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userModel = new User();
    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.createUser({
      email,
      password: hashedPassword, // Store hashed password
      role,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Exclude password from user object before sending it back
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed, please try again later." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userModel = new User();
    const user = await userModel.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed, please try again later." });
  }
};

module.exports = { getCurrentUser, registerUser, loginUser };
