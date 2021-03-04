const Post = require("../models/post");
module.exports.create = function (req, res) {
  Post.create(
    { content: req.body.content, user: req.user._id }, // passport keep the loged in user in req.user can see in passport configuration code
    function (err, post) {
      if (err) {
        console.log("error while creating post");
        return;
      }
      return res.redirect("back");
    }
  );
};
