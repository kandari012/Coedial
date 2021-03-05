const Comment = require("../models/comment");
const Posts = require("../models/post");
module.exports.create = function (req, res) {
  Posts.findById(req.body.post, function (err, post) {
    if (err) {
      console.log("error while finding post");
      return;
    }
    //if post exist with id
    if (post) {
      Comment.create(
        { content: req.body.content, user: req.user._id, post: req.body.post },
        function (err, comment) {
          if (err) {
            console.log("error while creating comment");
            return;
          }
          post.comments.push(comment); //add to post  will fetch the id and push it
          post.save(); //on each update save

          res.redirect("back");
        }
      );
    }
  });
};

//delete comment and from comment db and comment id from array in post db

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    //user of comment and user of post can remove the comment
    Posts.findById(comment.post, function (err, post) {
      if (comment.user == req.user.id || post.user == req.user.id) {
        let postId = comment.post;
        comment.remove();

        Posts.findByIdAndUpdate(
          //find postby id and update the comments inside
          postId,
          { $pull: { comments: req.params.id } },
          function (err, post) {
            res.redirect("back");
          }
        );
      } else {
        res.redirect("back");
      }
    });
  });
};
