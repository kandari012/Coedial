const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/users_controller");
const User = require("../models/user");
console.log("routes exported");

//make profile page only accessible if the user is signed in
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);
router.get("/posts", userController.posts);
router.get("/sign-up", passport.isUserLogedIn, userController.signUP);
router.get("/sign-in", passport.isUserLogedIn, userController.signIn);
router.post("/create", userController.create);
router.get("/sign-out", userController.destroySession);
router.post("/update/:id", userController.update);
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
//when click on sigin with google takes to the pop up
//scope what information neede from google on user signup/signin
//path given by passport
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
); //url at whic we will receive the data
//google fetch data and pass to the server
//signout only from coedial not from google
//will work when we selec a account
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
module.exports = router;
