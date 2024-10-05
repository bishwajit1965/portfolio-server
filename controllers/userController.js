const User = require("../models/User");

// Get all users (only super-admin can access this)
const getAllUsers = async (req, res) => {
  try {
    const userModel = new User();
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Update a user's role (only super-admin can access this)
const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  try {
    const userModel = new User();
    const success = await userModel.updateUser(id, role);
    if (success) {
      res.status(200).json({ message: "Role updated successfully" });
    } else {
      res.status(400).json({ message: "Failed to update role" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating role" });
  }
};

module.exports = { getAllUsers, updateUserRole };
