const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.toggleLike = async function (req, res) {
  try {
    //Likes/toggle/?id=abcd &type=post    //id of post or comment

    let likeable;
    let deleted = false;

    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id).populate("Likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("Likes");
    }
    //check if a like alredy exists

    let existingLike = await Like.findOne({
      Likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    //if like already exist then delete it
    if (existingLike) {
      likeable.likes.pull(existingLike._id); //remove like from post or comment schema array of likes
      likeable.save();

      existingLike.remove(); //remove like from like schema
      deleted = true;
    } else {
      //else make a new like

      let newLike = await Like.create({
        Likeable: req.query.id,
        onModel: req.query.type,
        user: req.user._id,
      });

      likeable.likes.push(newLike._id); // add newly created like into the array of likes in post or comment
      likeable.save();
    }
    return res.json(200, {
      message: "request success",
      data: {
        deleted: deleted,
        likeable: likeable,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
