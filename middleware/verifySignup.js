
const db = require("../models");
const ROLES = db.ROLE;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check for duplicate username
    const user = await User.findOne({
      where: { username: req.body.username }
    });
    if (user) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }
    // Check for duplicate email
    const emailUser = await User.findOne({
      where: { email: req.body.email }
    });
    if (emailUser) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }
    next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          return res.status(400).send({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
          });
        }     
      }
    }
    next();
  };
  const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
  };
  module.exports = verifySignUp;