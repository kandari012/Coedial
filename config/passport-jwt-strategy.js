const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy; //importing startegy
const ExtractJWT = require("passport-jwt").ExtractJwt; //will help extracting the JWT from header

const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), //header list of key,it  has key authorization which is also list of keys ,which has key bearer which has JWT token,used when checking authentication from postman
  
  secretOrKey: "codeial", //encryption and decreption string used in controller while creating jwt
};
//once the user jwt is generated it is used after that to authenticate the jwt
passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    //call back fxn reads data from jwt payloadjwtpayload has the
    //user_id is present in payload checking whether the user existif yes then authenticated
    User.findById(jwtPayLoad._id, function (err, user) {
      //finding user from jwtpayload
      if (err) {
        console.log("erroe in finding user from JWT");
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
