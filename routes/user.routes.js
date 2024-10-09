const express=require("express");
const controller = require("../controllers/user.controller");
const router=express.Router();
router.get("/getAllusers",controller.getAllUsers);
module.exports = router;