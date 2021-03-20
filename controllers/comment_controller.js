const Comment = require("../models/comment");
const Posts = require("../models/post");
const commnetMailer = require("../mailers/comments_mailer"); //to use mailer
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

      let CommentWithUser = await Comment.findById(comment._id).populate(
        "user"
      ); //populate user to post
      //can also used as
      //commnet=await comment.populate("user","name email").execPopulate();

      commnetMailer.newComment(CommentWithUser); // to send mail on each comment created
      //type of ajax request is xml-http  (xhr) will send this data to ajax success
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
            post_id: req.body.post,
            username: CommentWithUser.user.name,
          },
          //post which is created in db entry
          message: "Comment Created",
        });
      }

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

      //type of ajax request is xml-http  (xhr) will send this data to ajax success
      if (req.xhr) {
        return res.status(200).json({
          data: { comment_id: req.params.id }, // id of comment which need to be deleted
          message: "Comment Deleted",
        });
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
