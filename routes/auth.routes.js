//const { verifySignUp } = require("../middleware");
 const verifySignUp =require("../middleware/verifySignup");
const express=require("express");
const controller = require("../controllers/auth.controller");
const {validateSignup,validateRoleAssignment} = require("../middleware/validation"); 
const router=express.Router();
router.post("/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail],validateSignup,
  controller.signup)
router.post("/role",validateRoleAssignment,controller.role)
router.post("/roleassign",controller.roleassign)
router.post("/login", controller.login); 

module.exports=router;