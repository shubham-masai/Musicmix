const jwt = require("jsonwebtoken");

const secretKey = "your_secret_key";

// Middleware for generating JWT tokens
function generateToken(user) {
  return jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
}

// Middleware for verifying JWT tokens
function verifyToken(req, res, next) {
  // Get the token from the request header or query parameter
  const token = req.headers.authorization?.split(" ")[1] || req.query.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Invalid token." });
    }

    // Attach the decoded user ID to the request object for future use
    req.userId = decoded.userId;
    next();
  });
}

module.exports = {
  generateToken,
  verifyToken,
};
