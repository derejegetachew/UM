
const express=require("express");
const jwt = require("jsonwebtoken");
const config=require("../configration/auth.config");
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id; // Store user ID for later use
    next();
  });
};
module.exports = verifyToken;
