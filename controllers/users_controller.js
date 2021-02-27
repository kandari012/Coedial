const User = require("../models/user");

//show user profile
module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (err) {
        console.log("error while finding the user");
        return;
      }

      if (user) {
        return res.render("users_profile", {
          title: "User-Profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sign-in");
      }
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

module.exports.posts = function (req, res) {
  return res.end("<h1> UserPosts </h1>");
};
//render signup page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_Up", { title: "signUP" });
};
//render signin page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_In", { title: "signIn" });
};
//signout user
module.exports.signOut = function (req, res) {
  res.clearCookie("user_id");
  return res.redirect("/users/sign-in");
};

//to create new users

module.exports.create = function (req, res) {
  //if pasword and confirm password not match
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

//to craete new session by storing cookies
module.exports.createSession = function (req, res) {
  //find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error while finding the user");
      return;
    }
    //handle user found
    if (user) {
      //handle password which not match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      //handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      //handle user not found
      return res.redirect("back");
    }
  });
};
