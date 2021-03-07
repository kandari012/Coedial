const post = require("../models/post");
const User = require("../models/user");
module.exports.home = function (req, res) {
  //populate the user for each post
  post
    .find({})
    .populate("user") //population user of post
    .populate({
      //population comments of post
      path: "comments",
      populate: {
        //population user of each comment
        path: "user",
      },
    })
    .exec(function (err, posts) {
      if (err) {
        console.log("erroe while fething post", err);
        return;
        //i mute my mic
        //can i drop post collection in dta
        //hmm whats the error? ek sec
      }
      User.find({}, function (err, users) {
        return res.render("home", {
          title: "Home",
          posts: posts,
          all_users: users,
        });
      });
    });
};

//module.exports.actionNmae=function(req,res)
{
}
