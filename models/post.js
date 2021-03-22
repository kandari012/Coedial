const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    //to link it with user
    user: {
      type: mongoose.Schema.Types.ObjectId, //will refer to user schema will take id of user from user schema
      ref: "User", //schema of User
    },
    //include array of id of all comments in this post schema itself
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  },

  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Post", postSchema);

module.exports = Posts;
