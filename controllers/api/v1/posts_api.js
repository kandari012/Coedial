const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
module.exports.index = async function (req, res) {
  let posts = await Post.find({}) //awaits will execute this
    .sort("-createdAt")
    .populate("user") //population user of post
    .populate({
      //population comments of post
      path: "comments",
      populate: {
        //population user of each comment
        path: "user",
      },
    });

  return res.json(200, { message: "success", posts: posts });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      //.id means converting the object id into string

      post.remove();
      await Comment.deleteMany({ post: req.params.id });

      return res.json(200, {
        message: "post and associated comments deleted",
      });
    } else {
      return res.json(401, {
        message: "you are not authorized to delete the post",
      });
    }
  } catch (err) {
    console.log("error----------------", err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
