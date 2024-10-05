const express = require("express");
const {
  getCurrentUser,
  registerUser,
  loginUser,
} = require("../controllers/authController");

const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Get the current user
router.get("/currentUser", verifyToken, getCurrentUser);
// Route for user registration
router.post("/register", registerUser);

//Route for user Login
router.post("/login", loginUser);

module.exports = router;
