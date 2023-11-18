const express = require("express");
const authrouter = express.Router();
const userController = require("../controllers/userController");
const authentication = require("../config/authentication");
const validation = require("../utils/validation");

// Route for user registration
authrouter.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!validation.isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (!validation.isValidPassword(password)) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long." });
  }

  userController.registerUser(req, res);
});

// Route for user login
authrouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!validation.isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (!validation.isValidPassword(password)) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long." });
  }

  userController.loginUser(req, res);
});

// Route for getting user profile (requires authentication)
authrouter.get(
  "/profile",
  authentication.verifyToken,
  userController.getUserProfile
);

module.exports = authrouter;
