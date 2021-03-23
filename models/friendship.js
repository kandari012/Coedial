const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema(
  {
    // user who sends the request
    from_user: {
      type: mongoose.Schema.Types.ObjectId, //will refer to user schema will take id of user from user schema
      ref: "User", //schema of User
    },
    //user user who accept the request
    to_user: {
      type: mongoose.Schema.Types.ObjectId, //will refer to user schema will take id of user from user schema
      ref: "User", //schema of User
    },
  },

  {
    timestamps: true,
  }
);

const Friendship = mongoose.model("Friendship", friendshipSchema);

module.exports = Friendship;
