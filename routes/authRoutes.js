const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

//Route for user Login
router.post("/login", loginUser);

module.exports = router;
