const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

//middleware to define the layout for the application
const expresslayouts = require("express-ejs-layouts");

//to connect with db
const db = require("./config/mongoose");

//used for session cookie
//  to store user id into session cookie
const session = require("express-session");

//for authentication using passport
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle=require("./config/passport-google-oauth2-strategy");
// will store express session in mongo store require express session which we created
const MongoStore = require("connect-mongo").default;
//to read form posted data
//middleware to convert our scss into css
const sassMiddleware = require("node-sass-middleware");
// to use flash messages
const flash = require("connect-flash");
//use middleware to add flash message from req to response
const customMware = require("./config/middleware");
//make the avatar upload path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  sassMiddleware({
    src: "./assets/scss", //source file of scss
    dest: "./assets/css", //dest where to put the css files converted
    debug: true, // all the error and commands we see during compilation need to see if compilation fail etc
    outputStyle: "extended", //multiple line style
    prefix: "/css", //where the server should lookout for css files
  })
);
app.use(express.urlencoded());

//to parse cookie
app.use(cookieParser());

app.use(expresslayouts);

//middleware to extract styles and scripts from subpage into the layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//middleware to define the asset folder
app.use(express.static("./assets"));

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");
//mongo store is used to store the cookie in the db
//after view middleware which takes session cookie and encrypt it

app.use(
  session({
    name: "codeial", //name of cookie
    //todo change the secret before deployment in prod mode
    secret: "blah", //when encryption happens the key to encode and decode
    saveUninitialized: false, //
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, //number of minutes  ( in milliseconds)
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/codeial_db", //provide the link of the db
      },
      function (err) {
        //call back fxn if there is an error
        console.log(err || "connect mongodb setup ok");
      }
    ),
  })
);
//telling app to use passport
app.use(passport.initialize());
app.use(passport.session());
//when app initialize passport gets initialize and this fxn is called, check whether session cookie is present and user will be set in locals for each request as it is middleware
//after passport
app.use(passport.setAuthenticatedUser);

//after sesion as it uses session cookies
app.use(flash());
//use custom mware to add flash message to res   after flash  will run for each request
app.use(customMware.setFlash);

//after passport is initialized middleware use express router
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log(`error in running the server :  ${port}`);
  }
  console.log(`server is running on port :  ${port}`);
});
