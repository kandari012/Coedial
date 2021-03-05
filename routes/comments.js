const express = require("express");
const router = express.Router();
const passport = require("passport");

const comment_Controller = require("../controllers/comment_controller");

router.post("/create", passport.checkAuthentication, comment_Controller.create);
router.get(
  //using params to get id of comment
  "/destroy/:id",
  passport.checkAuthentication,
  comment_Controller.destroy
);

module.exports = router;
