const config = require("../configration/dbconfig");
const db = require("../models");
const User = db.user;
const Role = db.role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    console.log("Received signup request with body:", req.body);

    // Create a new user
    const user = await User.create({
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      roleid: req.body.roleid
    });

    console.log("User created successfully", user);

    // Assign roles to the user
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: req.body.roles,
        },
      });
      console.log("Roles found:", roles);

      if (roles.length > 0) {
        await user.setRoles(roles);
        console.log("Roles assigned to user:", roles);
      } else {
        console.log("No roles found for assignment");
      }
    } else {
      // Default role is "user"
      const role = await Role.findOne({
        where: { name: "user" },
      });
      if (role) {
        await user.setRoles([role]);
        console.log("Default role assigned:", role);
      } else {
        console.log("Default role 'user' not found");
      }
    }

    res.status(200).send({ message: "User was registered successfully!" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { username: req.body.username },
            { email: req.body.email },
          ],
        },
        include: [
          {
            model: Role,
            as: "roles",
            attributes: ["name"],
            through: { attributes: [] }, // Exclude join table attributes
          },
        ],
      });
   
      if (!user) {
        return res.status(404).send({ message: "Invalid Username or Password!" });
      }
  
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
  
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Username or Password!",
        });
      }
  
      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        expiresIn: 86400, // 24 hours
      });
  
      const authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());
  
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  