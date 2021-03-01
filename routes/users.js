const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/users_controller");
console.log("routes exported");

//make profile page only accessible if the user is signed in
router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/posts", userController.posts);
router.get("/sign-up", userController.signUP);
router.get("/sign-in", userController.signIn);
router.post("/create", userController.create);
router.get("/sign-out", userController.destroySession);

//use passport as a middleware to authenticate
//when /create-session is hit then first passport authenticate if ok then move to controller action userController.createSession else redirect to /users/sign-up

router.post(
  "/create-session",
  passport.authenticate("local", {
    //if signin fails ,else move to controller action ,authentication strategy
    failureRedirect: "/users/sign-up",
  }),
  userController.createSession
);

module.exports = router;
