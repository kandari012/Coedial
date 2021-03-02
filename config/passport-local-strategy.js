//present in documnetation   http://www.passportjs.org/docs/username-password/

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// find user and authenticate
//telling passport to use local strategy
passport.use(
  new LocalStrategy(
    {
      //to decide username field from schema which will bw unique
      usernameField: "email",
    },
    //callback fxn
    function (email, password, done) {
      //done inbuild passport fxn   takes 2 arg one err second some else
      //find a user and stablish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in finding user ------>passport");
          return done(err);
        }

        if (!user || user.password != password) {
          console.log("Invalid User /Password");
          return done(null, false);
        }
        return done(null, user); //if user is found it will return the user to serializer
      });
    }
  )
);

//serializing the user to decide which kwy is to be kept in the cookies ,which will be encrypted by express session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialize the user from the key in the cookies  willdecrypt the id and find the info of that id in db

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding user ------>passport");
      return done(err);
    }
    return done(null, user);
  });
});
//2 steps to send data to views
//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //passport method if user is signed in ,then pass on the request to the next fxn (controller action)
  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //whenevera user is signed in that user info is avaolable in request .user bcause we are using user model ,user is already handled by passport
    //req.user contains the current signed in user from the session cookie and we rae just sending this to the locals of views
    res.locals.user = req.user;
  }
  return next();
};
//if user is authenticated no need to sign in or up directly take to profile
passport.isUserLogedIn = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/profile");
};

module.exports = passport;
