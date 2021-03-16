const User = require("../../../models/user");
const jwt = require("jsonwebtoken"); //import json web token to create jwt

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || req.body.password != user.password) {
      return res.json(422, {
        message: "invalid username or password",
      });
    }
    //if user exist create jwt for the user which willbe stored in client memory
    return res.json(200, {
      message: "sign in successful here is your token keep it safe",
      //codeal key is used to encrypt as it is used to decreyte in startegy jwt
      data: {
        token: jwt.sign(user.toJSON(), "codeial", { expiresIn: "100000" }),
      },
    });
  } catch (err) {
    console.log("error----------------", err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
