const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto"); //to generate random password when user in signup using google
const User = require("../models/user");

// tell passport to use new startegy for google login
passport.use(
  new googleStrategy(
    {
      //credentials app will use when need to create identity of new or existing user
      clientID:
        "978512015840-rrbo35fq55bfqghmrv6nbckc1mbuok0k.apps.googleusercontent.com",
      clientSecret: "a7qCZmMxxPy-fABcj3b4_m6A",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    }, //access token like jwt ,refresh token if acesstoken expires use refresh token to get new token without asking user to login
    //profile contains user info
    function (accessToken, refreshToken, profile, done) {
      //find user whose email in db =email of google
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google strategy passport");
          return;
        } //if found set in req.user
        if (user) {
          return done(null, user);
        } else {
          //if not found signin and set in req.user,
          //create new user with email og google nad name from google and random password and sign in
          User.create(
            {
              email: profile.emails[0].value,
              name: profile.displayName,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "error in craeting user using google strategy passport"
                );
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
