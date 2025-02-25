const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

module.exports = { authenticateToken, authorizeRole };
