const User = require("../models/User");
const authentication = require("../config/authentication");
const bcrypt = require("bcrypt");

// Controller for user registration
exports.registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
    });

    await user.save();

    const token = authentication.generateToken(user);

    res.status(201).json({ message: "Registration successful.", token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

// Controller for user login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const token = authentication.generateToken(user);

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};

// Controller for getting user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user profile." });
  }
};
