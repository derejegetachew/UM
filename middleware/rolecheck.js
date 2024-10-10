const db = require("../models");
const User = db.user;
const Role = db.role;

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: ["roles"], // Assuming roles are associated with the user
    });
    if (user && user.roles.some(role => role.name === "admin")) {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Unable to validate admin role" });
  }
};
const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: ["roles"],
    });
    if (user && user.roles.some(role => role.name === "moderator")) {
      next();
    } else {
      res.status(403).send({ message: "Require Moderator Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Unable to validate moderator role" });
  }
};
const isUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: ["roles"],
    });

    if (user && user.roles.some(role => role.name === "user")) {
      next();
    } else {
      res.status(403).send({ message: "Require User Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Unable to validate user role" });
  }
};
module.exports = {
  isAdmin,
  isModerator,
  isUser
};

