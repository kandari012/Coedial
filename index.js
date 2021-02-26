const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

//middleware to define the layout for the application
const expresslayouts = require("express-ejs-layouts");

//to connect with db
const db = require("./config/mongoose");

//to read form posted data
app.use(express.urlencoded());

//to parse cookie
app.use(cookieParser());

app.use(expresslayouts);

//middleware to extract styles and scripts from subpage into the layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//middleware to define the asset folder
app.use(express.static("./assets"));

// middleware use express router
app.use("/", require("./routes/index"));

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`error in running the server :  ${port}`);
  }
  console.log(`server is running on port :  ${port}`);
});
