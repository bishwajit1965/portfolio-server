// Created on 29.09.24
const express = require("express");

const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/jwt");
const router = express.Router();

const users = [];

// User registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword };

  // Confused
  users.push(newUser);
  const token = createToken(newUser);
  res.status(201).json({ user: newUser, token });
});

// User registration

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email); //Replace with your database logic
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = createToken(user);
  res.json({ user, token });
});

module.exports = router;
