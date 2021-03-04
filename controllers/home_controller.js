const post = require("../models/post");
module.exports.home = function (req, res) {
  //populate the user for each post
  post
    .find({})
    .populate("user")
    .exec(function (err, posts) {
      if (err) {
        console.log("erroe while fething post");
        return;
      }

      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    });
};

//module.exports.actionNmae=function(req,res)
{
}
