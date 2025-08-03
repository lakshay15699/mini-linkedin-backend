const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now req.user.id is available
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};

module.exports = authMiddleware;
