const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("users_profile", {
      title: "Profile",
      profile_user: user,
    });
  });
};

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};
module.exports.posts = function (req, res) {
  return res.end("<h1> UserPosts </h1>");
};

module.exports.signUP = function (req, res) {
  return res.render("user_sign_Up", { title: "signUP" });
};

module.exports.signIn = function (req, res) {
  return res.render("user_sign_In", { title: "signIn" });
};
//to create new users

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error while finding the user");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error while finding the user");
          return;
        }
        console.log("user created");
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
// user is already signed in so just need to redirect if authentication from passport is sucess then control come to this controller
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(); //this fxn is given to req using passport.js   removing users session cookie

  return res.redirect("/");
};
