const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    // object on which like is placed
    //this defines the object id of the liked object
    // likeable can be post or commnet due to onModel
    Likeable: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: "onModel",
    },
    //this field is used for defining the type of the liked object since thi is a dynamic reference
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likesSchema);

module.exports = Like;
