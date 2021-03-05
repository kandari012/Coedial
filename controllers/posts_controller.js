const Post = require("../models/post");
const Comment = require("../models/comment");
//create post
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

//delete post and all its comments

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log("error while finding the post");
      return;
    }
    //.id means converting the object id into string
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
