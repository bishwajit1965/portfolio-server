// created on 29.09.24

const { verifyToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split("")[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = verifyToken(token);
    req.user = decoded; //Attach user info to request
    next();
  } catch (error) {
    return res.status(403).send("Forbidden");
  }
};

module.exports = authMiddleware;
