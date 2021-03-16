const express = require("express");
const router = express.Router();
const postsApi = require("../../../controllers/api/v1/posts_api");
const passport = require("passport");

router.get("/", postsApi.index);
//will check whether the user is authorized or there is jwt for the user
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsApi.destroy
); //prevent session cookies to be generated use session false

module.exports = router;
