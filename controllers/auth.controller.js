const db = require('../models'); // Adjust path if necessary
const User = db.user; // Ensure you're accessing it as `db.user`
const Role = db.role; // Access the Role model if needed
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    console.log("Received signup request with body:", req.body);

    const newuser = await User.create({
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    console.log("User created successfully", newuser);
    res.status(200).send({ message: "User was registered successfully!" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send({ message: err.message });
  }
};
exports.role = async (req, res) => {
  try {
    console.log("Received role request with body:", req.body);

    const newrole = await Role.create({
      id: req.body.id,
      name: req.body.name
    });

    console.log("User created successfully", newrole );
    res.status(200).send({ message: "role was registered successfully!" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.roleassign = async (req, res) => {
  try {
    const { userId, roleId } = req.body; 

    const user = await db.user.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const role = await db.role.findByPk(roleId);
    if (!role) {
      return res.status(404).send({ message: "Role not found!" });
    }
    await user.addRole(role); 

    res.status(200).send({ message: "Role assigned successfully!" });
  } catch (err) {
    console.error("Error assigning role:", err);
    res.status(500).send({ message: err.message });
  }
};
