// backend/middleware/verifyToken.js
const admin = require("../config/firebaseAdmin");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach decoded token to the request object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
