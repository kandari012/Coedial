const express=require("express");
const router=express.Router();

const userController=require("../controllers/users_controller");
console.log("routes exported");

router.get("/profile",userController.profile);
router.get("/posts",userController.posts);
module.exports=router;