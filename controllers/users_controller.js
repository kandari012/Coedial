const User = require("../models/user");
const path = require("path");
const fs = require("fs");
const Friendship = require("../models/friendship");

module.exports.profile = async function (req, res) {
  let friend = false;
  let user = await User.findById(req.params.id);
  //check is friendship exist between logenin user and current user whose profile page is open
  let friendship = await Friendship.find({
    $or: [
      { from_user: req.user.id, to_user: req.params.id },
      { to_user: req.user.id, from_user: req.params.id },
    ],
  });
  if (friendship) {
    friend = true;
  }
  return res.render("users_profile", {
    title: "Profile",
    profile_user: user,
    friend: friend,
  });
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id); //not able to directly use fiels from req.body as it is multipart/form-data as body parser can't parse it
      await User.uploadedAvatar(req, res, function (err) {
        //multer used to acess body part of request
        if (err) {
          console.log(
            "-------------------error in multer ---------------------",
            err
          );
        }

        user.name = req.body.name;
        user.email = req.body.email;
        let avatarPath = path.join(__dirname, "..", User.avatarPath);
        if (req.file) {
          //if user have avatar field then delete the previous vataer and add new avataer to the file
          //if folder have more than one avatar then delete the previous avatar

          if (fs.readdirSync(avatarPath).length > 1) {
            if (user.avatar) {
              fs.unlinkSync(path.join(__dirname, "..", user.avatar));
            }
          }

          // saving the path of the uploaded file in the avatar field of db
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Not authorized to update profile");
    return res.redirect("back");
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
    req.flash("error", "password not matched");
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
        req.flash("success", "User Created");

        return res.redirect("/users/sign-in");
      });
    } else {
      req.flash("error", "User already exist");

      return res.redirect("/users/sign-in");
    }
  });
};
// user is already signed in so just need to redirect if authentication from passport is sucess then control come to this controller
module.exports.createSession = function (req, res) {
  req.flash("success", "logged in successfully"); //add flash message to req
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(); //this fxn is given to req using passport.js   removing users session cookie
  req.flash("success", "logged out successfully");
  return res.redirect("/");
};
