const { verifyToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting Bearer token
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach decoded token info (e.g., user ID) to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = authMiddleware;
