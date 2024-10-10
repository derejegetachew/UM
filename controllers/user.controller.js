const express = require('express');
const db = require("../models"); // Import your database models
const app=express();
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users and include their associated roles
    const users = await db.user.findAll({
      include: [
        {
          model: db.role,
          as: "roles",  // This is the alias you defined in the association
          through: { attributes: [] } // This hides the user_roles join table data
        }
      ]
    });
    res.status(200).send(users); // Return the users with their roles
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send({ message: err.message });
  }
};
exports.getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username; // Get the username from the request parameters
    // Find user by username and include roles
    const user = await db.user.findOne({
      where: { username: username },
      include: [
        {
          model: db.role,
          as: "roles", // Alias used in the association
          through: { attributes: [] } // Hide join table data
        }
      ]
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user); // Return the found user
  } catch (err) {
    console.error("Error fetching user by username:", err);
    res.status(500).send({ message: err.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { username } = req.params;  // Fetch the username from the request parameters
    const updatedData = req.body;     // The new data to update the user
    // Find the user by username
    const user = await db.user.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    // Update the user's data with the new attributes
    await user.update(updatedData);
    res.status(200).send({ message: "User updated successfully!", data: user });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send({ message: err.message });
  }
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
