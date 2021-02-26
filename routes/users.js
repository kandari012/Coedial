const express = require("express");
const router = express.Router();

const userController = require("../controllers/users_controller");
console.log("routes exported");

router.get("/profile", userController.profile);
router.get("/posts", userController.posts);
router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);
router.post("/create", userController.create);
router.post("/create-session", userController.createSession);
router.get("/sign-out", userController.signOut);
module.exports = router;
