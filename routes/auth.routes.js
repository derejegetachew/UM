//const { verifySignUp } = require("../middleware");
 const verifySignUp =require("../middleware/verifySignup");
const express=require("express");
const controller = require("../controllers/auth.controller");
const router=express.Router();
router.post("/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail],
  controller.signup)
router.post("/role",controller.role)
router.post("/roleassign",controller.roleassign)


module.exports=router;