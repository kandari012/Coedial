const post = require("../models/post");
const User = require("../models/user");

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

    let users = await User.find({}); //awaits will execute this

    return res.render("home", {
      //then this
      title: "Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("error", err);
    return;
  }
};
