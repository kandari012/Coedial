const Friendship = require("../models/friendship");
const User = require("../models/user");

module.exports.toggleFriend = async function (req, res) {
  try {
    //friendship/toggle/?id=abcd   //id of user whom the request is sent
    let friend = false;

    let toUser = await User.findById(req.query.id);
    let fromUser = await User.findById(req.user.id);
    //check if a friend already exists

    let existingFriend = await Friendship.findOne({
      $or: [
        { from_user: req.user.id, to_user: req.query.id },
        { to_user: req.user.id, from_user: req.query.id },
      ],
    });
    //if friend already exist then delete it
    if (existingFriend) {
      toUser.friendships.pull(existingFriend._id); //remove frienship from to and from user schema array friendship
      toUser.save();
      fromUser.friendships.pull(existingFriend._id);
      fromUser.save();

      existingFriend.remove(); //remove friendship from frienship schema
    } else {
      //else make a new friendship

      let newFriendship = await Friendship.create({
        from_user: req.user.id,
        to_user: req.query.id,
      });

      toUser.friendships.push(newFriendship._id); //add the newly craeted frienship into from and to user schema array friendship
      toUser.save();
      fromUser.friendships.push(newFriendship._id);
      fromUser.save();
      friend = true;
    }

    return res.json(200, {
      message: "request success",
      data: {
        friend: friend,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
