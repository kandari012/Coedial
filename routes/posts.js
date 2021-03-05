const express = require("express");
const router = express.Router();
const passport = require("passport");

const post_Controller = require("../controllers/posts_controller");

router.post("/create", passport.checkAuthentication, post_Controller.create);

router.get(
  //using params to get id of post
  "/destroy/:id",
  passport.checkAuthentication,
  post_Controller.destroy
);
module.exports = router;
