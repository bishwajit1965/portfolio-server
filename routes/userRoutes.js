const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Example of protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}` });
});

module.exports = router;
