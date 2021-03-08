const Comment = require("../models/comment");
const Posts = require("../models/post");
module.exports.create = async function (req, res) {
  try {
    let post = await Posts.findById(req.body.post);

    //if post exist with id
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      });

      post.comments.push(comment); //add to post  will fetch the id and push it
      post.save(); //on each update save

      req.flash("success", "comment added ");

      res.redirect("back");
    }
    req.flash("error", "Post not exist ");

    res.redirect("back");
  } catch (err) {
    req.flash("error", err);

    res.redirect("back");
  }
};

//delete comment and from comment db and comment id from array in post db

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    //user of comment and user of post can remove the comment
    if (comment) {
      let post = await Posts.findById(comment.post);

      if (comment.user == req.user.id || post.user == req.user.id) {
        let postId = comment.post;
        comment.remove();

        await Posts.findByIdAndUpdate(
          //find postby id and update the comments inside
          postId,
          { $pull: { comments: req.params.id } }
        );
      }
      req.flash("success", "comment deleted");
      res.redirect("back");
    }
    req.flash("error", "comment not exist");
    res.redirect("back");
  } catch (err) {
    req.flash("error", err);

    res.redirect("back");
  }
};
