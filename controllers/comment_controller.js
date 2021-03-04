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
          post.save(); //on ecah update save

          res.redirect("back");
        }
      );
    }
  });
};
