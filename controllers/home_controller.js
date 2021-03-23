const post = require("../models/post");
const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.home = async function (req, res) {
  //async
  //populate the user for each post using async await
  try {
    //try catch
    let posts = await post //awaits will execute this
      .find({})
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

    let users = await User.find({});
    //awaits will execute this
    let friendship;
    //if user login then find all its friendships
    if (req.user) {
      friendship = await Friendship.find({
        $or: [{ from_user: req.user.id }, { to_user: req.user.id }],
      })
        .populate("from_user")
        .populate("to_user");
    }
    console.log(users);
    console.log(friendship);
    return res.render("home", {
      //then this
      title: "Home",
      posts: posts,
      all_users: users,
      friendship: friendship,
    });
  } catch (err) {
    console.log("error", err);
    return;
  }
};
