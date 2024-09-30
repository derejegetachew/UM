const jwt = require("jsonwebtoken");
//const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

// Verify token middleware
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// Check if user is admin
isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [{
        model: Role,
        as: "roles"
      }]
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const isAdmin = user.roles.some(role => role.name === 'admin');
    
    if (!isAdmin) {
      return res.status(403).send({ message: 'Require Admin Role!' });
    }

    next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Check if user is moderator
isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [{
        model: Role,
        as: "roles"
      }]
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const isModerator = user.roles.some(role => role.name === 'moderator');
    
    if (!isModerator) {
      return res.status(403).send({ message: 'Require Moderator Role!' });
    }

    next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};

module.exports = authJwt;
