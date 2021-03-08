const Post = require("../models/post");
const Comment = require("../models/comment");
//create post
module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    }); // passport keep the loged in user in req.user can see in passport configuration code
    req.flash("success", "post created");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

//delete post and all its comments

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    //.id means converting the object id into string
    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "post and its comments deleted");

      return res.redirect("back");
    } else {
      req.flash("error", "user not authorized to delete post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
