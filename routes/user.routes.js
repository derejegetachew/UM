const express = require("express");
const controller = require("../controllers/user.controller");
const authjwt = require("../middleware/authjwt");
const rolecheck=require("../middleware/rolecheck");
const router = express.Router();

router.get("/getAllUsers", controller.getAllUsers);
router.get("/getUserByUsername/:username", controller.getUserByUsername);
router.put("/updateUser/:username", authjwt, rolecheck.isAdmin, controller.updateUser);

// Ensure unique routes for each controller method
router.get("/userBoard", authjwt,rolecheck.isUser,controller.userBoard);
 router.get("/moderatorBoard", authjwt,rolecheck.isModerator, controller.moderatorBoard);
 router.get("/adminBoard", authjwt,rolecheck.isAdmin, controller.adminBoard);

module.exports = router;
