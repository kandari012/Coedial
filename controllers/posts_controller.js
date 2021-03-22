const Post = require("../models/post");
const Comment = require("../models/comment");
const Likes = require("../models/like");
//create post
module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    }); // passport keep the loged in user in req.user can see in passport configuration code
    let postWithUser = await Post.findById(post._id).populate("user"); //populate user to post
    //type of ajax request is xml-http  (xhr) will send this data to ajax success
    if (req.xhr) {
      return res.status(200).json({
        data: { post: post, username: postWithUser.user.name }, //post which is created in db entry
        message: "Post Created",
      });
    }
    // req.flash("success", "post created");
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
      //delete all likes associated to post
      await Likes.deleteMany({ Likeable: req.params.id });

      //delete all commnets and likes associated to those posts
      await Likes.deleteMany({ Likeable: { $in: post.comments } });

      //delete all comments associted to post
      await Comment.deleteMany({ post: req.params.id });

      //type of ajax request is xml-http  (xhr) will send this data to ajax success
      if (req.xhr) {
        return res.status(200).json({
          data: { post_id: req.params.id }, // id of post which need to be deleted
          message: "Post Deleted",
        });
      }
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
