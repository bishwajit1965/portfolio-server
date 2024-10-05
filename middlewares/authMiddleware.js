// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header (assuming 'Bearer <token>')
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized: no token provided " });
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  // Split the Bearer token and extract the actual token
  const token = authHeader.split(" ")[1];
  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded; // Attach decoded token info(id,email,role) to the request object
    // Move to the next middleware or route handler
    next();
  });
};

module.exports = verifyToken;
