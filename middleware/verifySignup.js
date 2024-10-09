
const db = require("../models");
//const ROLES = db.ROLE;
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
  const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    
  };
  module.exports = verifySignUp;