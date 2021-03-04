const express = require("express");
const router = express.Router();
const passport = require("passport");

const post_Controller = require("../controllers/posts_controller");

router.post("/create", passport.checkAuthentication, post_Controller.create);

module.exports = router;
