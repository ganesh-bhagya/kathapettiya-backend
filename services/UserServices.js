const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");
const RoleModel = require("../models/Role");

exports.getAllUsers = async () => {
  return await UserModel.find();
};

exports.createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    // Create a role and associate it with the user
    const roleId = "65ccc0f5e3e88e2e5665d274"; // Assuming this is the correct role ID
    const role = await RoleModel.findById(roleId);
    if (!role) {
      return res.status(400).json({ message: "Role not found" });
    }

    // Add the role to the user
    user.roles = role._id;
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
      // Duplicate key error
      return res.status(400).json({ message: "Email is already registered" });
    }
    // Other errors
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(userName);
    // Find user by userName
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "HTGWEWDWFSDCFSCW");
    res
      .status(200)
      .json({
        token,
        user: { userName: user.userName, email: user.email, userId: user._id },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
