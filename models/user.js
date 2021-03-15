const mongoose = require("mongoose");

//    to upload file
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }, //adding path of  avatar to db
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH)); //       path of avatars  models/../uploads/users/avatars
  },
  filename: function (req, file, cb) {
    // name of avatar with date in millisecond to make it unique   name in schema --avatar-date.now()
    cb(null, file.fieldname + "-" + Date.now());
  },
});
//static methods
//attach disk storage to multer on storage property
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
); //only one instance or file will be uploaded for field avatar
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);

module.exports = User;
